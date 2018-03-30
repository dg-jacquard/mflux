import "./login.html";
import { Meteor } from "meteor/meteor";

Template.login.events({
  "click .x-go": function(event, template) {
    var type = event.target.dataset.type;
    let form = $('#frmLogin');
    form.find(".x-j").hide();
    form.find(".x-" + type).fadeIn();
    form.find("[name=type]").val(type);
    form.find('input:visible:eq(0)').focus();
  },
  "submit #frmLogin": function(event, template) {
    event.preventDefault();
    const form = event.target;
    var email = form.email.value;
    var password = form.password.value;
    var name = form.name.value.trim();
    var type = form.type.value;
    var btn = form["btn-" + type];

    btn.setAttribute("disabled", "disabled");

    if (type == "login") {
      login();
    } else {
      var profile = {
        name: name
      };
      Meteor.call("user.create", email, password, profile, (error, response) => {
        console.log(error, response);
        if (error) {
          console.log(error);
          btn.removeAttribute("disabled");
        } else {
          login();
          FlowRouter.go("/");
        }
      });
    }

    function login() {
      Meteor.loginWithPassword(email, password, function(error) {
        if (error) {
          console.log(error);
          btn.removeAttribute("disabled");
        } else {
          FlowRouter.go("/");
        }
      });
    }

  }
});
