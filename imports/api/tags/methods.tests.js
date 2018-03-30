// Tests for tags methods
//
// https://guide.meteor.com/testing.html

import { Meteor } from 'meteor/meteor';
import { assert } from 'chai';
import { Tags } from './tags.js';
import './methods.js';

if (Meteor.isServer) {
  describe('tags methods', function () {
    beforeEach(function () {
      Tags.remove({});
    });

    it('can add a new tag', function () {
      const addTag = Meteor.server.method_handlers['tags.insert'];

      addTag.apply({}, ['kpax', 'red']);

      assert.equal(Tags.find().count(), 1);
    });
  });
}
