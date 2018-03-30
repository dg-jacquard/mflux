import { FlowRouter } from "meteor/kadira:flow-router";
import { BlazeLayout } from "meteor/kadira:blaze-layout";

// import templates
import '/imports/ui';

// routes
FlowRouter.route("/", {
  name: "App.home",
  action() {
    BlazeLayout.render("App_base", { main: "App_home", area: "flux" });
  }
});

FlowRouter.route("/flux/:_id", {
  name: "flux.show",
  action() {
    BlazeLayout.render("App_base", { main: "App_flux_show", area: "flux" });
  }
});
FlowRouter.route("/tags", {
  name: "App.tags",
  action() {
    BlazeLayout.render("App_base", { main: "App_tags", area: "tags" });
  }
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render("App_body", { main: "App_notFound" });
  }
};

FlowRouter.route("/login", {
  name: "login",
  action() {
    BlazeLayout.render("login");
  },
  triggersEnter: [() => {
    $('body').addClass('login');
  }],
  triggersExit: [() => {
    $('body').removeClass('login');
  }]
});

FlowRouter.route("/sign-up", {
  name: "sign-up",
  action() {
    FlowRouter.redirect('/login/#signup')
  }
});

FlowRouter.route("/logout", {
  name: "logout",
  action() {
    Accounts.logout();
    FlowRouter.go("/");
  }
});

// login session check
FlowRouter.triggers.enter([isNotLoggedIn], {
  except: ["login"]
});

function isNotLoggedIn(context, redirect) {
  if (!Meteor.user() && !Meteor.loggingIn()) {
    redirect("/login");
  }
}
