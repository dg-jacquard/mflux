// Tests for the behavior of the links collection
//
// https://guide.meteor.com/testing.html

import { Meteor } from 'meteor/meteor';
import { assert } from 'chai';
import { Tags } from './tags.js';

if (Meteor.isServer) {
  describe('tags collection', function () {
    it('insert correctly', function () {
      const tagId = Tags.insert({
        title: 'kpax',
        color: 'red',
      });
      const added = Tags.find({ _id: tagId });
      const collectionName = added._getCollectionName();
      const count = added.count();

      assert.equal(collectionName, 'tags');
      assert.equal(count, 1);
    });
  });
}
