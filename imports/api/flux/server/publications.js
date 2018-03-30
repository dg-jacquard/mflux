// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Flux } from '../flux.js';

Meteor.publish('flux.all', function () {
  return Flux.find();
});
