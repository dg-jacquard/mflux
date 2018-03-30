// Methods related to links

import { Meteor } from "meteor/meteor";
import { check, Match } from "meteor/check";
import { Flux } from "./flux.js";

Meteor.methods({
  "flux.insert"(title, amount, tags, date) {
    var user = Meteor.userId();
    console.log("flux.insert", title, amount, tags, date, user);
    check(title, String);
    check(amount, Number);
    check(tags, Match.Maybe([String]));
    check(date, Date);
    check(user, String);
    return Flux.insert({
      title,
      amount,
      tags,
      date,
      user,
      createdAt: new Date()
    });
  },
  "flux.update"(_id, title, amount, tags, date) {
    var user = Meteor.userId();
    console.log("flux.update", _id, title, amount, tags, date, user);
    check(_id, String);
    check(title, String);
    check(amount, Number);
    check(tags, Match.Maybe([String]));
    check(date, Date);
    check(user, String);
    return Flux.update(
      {
        _id: _id,
        user: user
      },
      {
        title,
        amount,
        tags,
        date,
        user,
        createdAt: new Date()
      }
    );
  },
  "flux.remove"(_id) {
    var user = Meteor.userId();
    console.log("flux.remove", _id);
    check(_id, String);
    check(user, String);
    return Flux.remove(
      {
        _id: _id,
        user: user
      }
    );
  }
});
