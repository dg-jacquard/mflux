// Tests for the links publications
//
// https://guide.meteor.com/testing.html

import { assert } from 'chai';
import { Tags } from '../tags.js';
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';
import './publications.js';

describe('tags publications', function () {
  beforeEach(function () {
    Tags.remove({});
    Tags.insert({
      title: 'kpax',
      color: 'red',
    });
  });

  describe('tags.all', function () {
    it('sends all tags', function (done) {
      const collector = new PublicationCollector();
      collector.collect('taags.all', (collections) => {
        assert.equal(collections.tags.length, 1);
        done();
      });
    });
  });
});
