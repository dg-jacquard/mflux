// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Tags } from './tags.js';

Meteor.methods({
  'tags.insert'(title, color) {
    var user = Meteor.userId();
    check(title, String);
    check(user, String);
    // check(color, String);

    return Tags.insert({
      title,
      color,
      user,
      createdAt: new Date()
    });
  },
  'tags.update'(_id, title, color) {
    var user = Meteor.userId();
    check(_id, String);
    check(title, String);
    check(user, String);
    // check(color, String);
    return Tags.update({
      _id: _id,
      user: user
    }, {
      $set: {
        title,
        color,
        updatedAt: new Date()
      }
    });
  },
  'tags.remove'(_id) {
    var user = Meteor.userId();
    check(_id, String);
    check(user, String);
    // check(color, String);
    return Tags.remove({
      _id: _id,
      user: user
    });
  },
});
