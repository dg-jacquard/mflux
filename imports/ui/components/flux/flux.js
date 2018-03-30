import { Flux } from "/imports/api/flux/flux.js";
import { Tags } from "/imports/api/tags/tags.js";
import { Meteor } from "meteor/meteor";
import "./flux.html";

const numeral = require("numeral");
const numPtBr = require("numeral/locales/pt-br");

Template.flux.onCreated(function() {
  var template = this;
  template.tagsReady = new ReactiveVar(false);
  template.totalBalance = new ReactiveVar(0);
  template.fluxCount = new ReactiveVar(0);
  template.startDate = new ReactiveVar(
    moment()
      .startOf("month")
      .toDate()
  );
  template.endDate = new ReactiveVar(
    moment()
      .endOf("month")
      .toDate()
  );
  template.filterByTags = new ReactiveVar([]);
  Meteor.subscribe("flux.all");
  Meteor.subscribe("tags.all", () => {
    console.log("tags ready");
    template.tagsReady.set(true);
  });
});

Template.flux.onRendered(function() {
  var template = Template.instance();
  var startDate = moment(template.startDate.get());
  var endDate = moment(template.endDate.get());

  console.log("clientConfig", clientConfig);

  $(".currency").inputmask("numeric", clientConfig.inputMaskCurrency);

  function updateRange(start, end, label) {
    if (label == "Hoje" || label == "Ontem") {
      html = label + " - " + start.format("MMMM D, YYYY");
    } else if (label == "Este mês" || label == "Mês passado") {
      html =
        label +
        " - dia " +
        start.format("D") +
        " até " +
        end.format("D") +
        " de " +
        start.format("MMMM/YYYY");
    } else {
      html =
        label +
        " - " +
        start.format("MMMM D, YYYY") +
        " até " +
        end.format("MMMM D, YYYY");
    }
    $("#reportrange span").html(html);
  }

  $("#reportrange").daterangepicker(
    {
      locale: clientConfig.pickerLocale,
      startDate: startDate,
      endDate: endDate,
      ranges: {
        Hoje: [moment(), moment()],
        Ontem: [moment().subtract(1, "days"), moment().subtract(1, "days")],
        "Últimos 7 dias": [moment().subtract(6, "days"), moment()],
        "Últimos 30 dias": [moment().subtract(29, "days"), moment()],
        "Este mês": [moment().startOf("month"), moment().endOf("month")],
        "Mês passado": [
          moment()
            .subtract(1, "month")
            .startOf("month"),
          moment()
            .subtract(1, "month")
            .endOf("month")
        ]
      }
    },
    updateRange
  );

  updateRange(startDate, endDate, "Este mês");
});

Template.flux.helpers({
  flux() {
    if (!Meteor.user()) return [];
    var template = Template.instance();
    var query = {
      user: Meteor.user()._id
    };
    var startDate = moment(template.startDate.get());
    var endDate = moment(template.endDate.get());
    var filterByTags = template.filterByTags.get() || [];

    query.date = {
      $gte: new Date(startDate.format("YYYY-MM-DD")),
      $lte: new Date(endDate.format("YYYY-MM-DD"))
    };

    if (filterByTags.length) {
      query.tags = { $in: filterByTags };
    }

    console.log(JSON.stringify(query));

    var flux = Flux.find(query, { sort: { date: 1 } });
    var total = 0;
    var fcount = 0;

    flux.map(i => {
      total += i.amount;
      fcount++;
    });

    total = "R$ " + numeral(total).format("0,0.00");
    template.totalBalance.set(total);
    template.fluxCount.set(fcount);
    console.log("fluxCount", template.fluxCount.get(), fcount);

    return flux;
  },
  totalBalance: () => Template.instance().totalBalance.get(),
  fluxCount: () => Template.instance().fluxCount.get(),
  today: () => moment().format("YYYY-MM-DD"),
  tag(_id, key) {
    var tag = Tags.findOne(_id);
    if (tag && tag[key]) {
      return tag[key];
    }
  },
  count: obj => obj.length || 0,
  formatCurrency: amount => "R$ " + numeral(amount).format("0,0.00"),
  tagsReady: () => Template.instance().tagsReady.get(),
  tagOptions() {
    if (!Meteor.user()) return [];
    let tags = Tags.find({
      user: Meteor.user()._id
    }).map(function(doc) {
      return {
        label: doc.title,
        value: doc._id
      };
    });
    return tags;
  },
  selectOptions() {
    return {
      buttonClass: "btn btn-white",
      nonSelectedText: "Tags",
      disableIfEmpty: true,
      enableFiltering: true,
      includeResetOption: true,
      allSelectedText: "Todas as tags",
      includeSelectAllOption: false,
      onChange() {}
    };
  },
  classPosNeg(n) {
    return Math.floor(n) < 0 ? "n-negative" : "n-positive";
  }
});

Template.flux.events({
  "apply.daterangepicker #reportrange"(event, template, picker) {
    template.startDate.set(picker.startDate.toDate());
    template.endDate.set(picker.endDate.toDate());
  },
  "change [name=filterByTags]"(event, template) {
    var tags = $(event.target).val();
    template.filterByTags.set(tags);
  },
  "click .remove"(event) {
    Meteor.call("flux.remove", this._id, (error, ret) => {
      console.log(error, ret);
    });
  },
  "submit .flux-add"(event) {
    event.preventDefault();

    const target = event.target;
    const title = target.title.value.trim();
    const amount = numeral(target.amount.value).value();
    const tags = $(target.tags).val() || [];
    const date = moment(target.date.value).toDate();

    Meteor.call("flux.insert", title, amount, tags, date, (error, _id) => {
      if (error) {
        console.log("flux.insert error", error);
        alert(error.error);
      } else {
        event.target.reset();
      }
    });
  }
});
