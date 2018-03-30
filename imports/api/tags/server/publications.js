// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Tags } from '../tags.js';

Meteor.publish('tags.all', function () {
  return Tags.find();
});
