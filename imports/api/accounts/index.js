import { Meteor } from "meteor/meteor";
import { check, Match } from "meteor/check";

Meteor.methods({
  "user.create"(email, password, profile) {
    console.log("user.create", email, password, profile);
    check(email, String);
    check(password, String);
    return Accounts.createUser({
      email: email,
      password: password,
      profile: profile
    });
  }
});
