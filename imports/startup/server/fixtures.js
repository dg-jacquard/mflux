// Fill the DB with init data on startup

import { Meteor } from 'meteor/meteor';
import { Tags } from '../../api/tags/tags.js';

Meteor.startup(() => {
  // if the Tags collection is empty
  if (Tags.find().count() === 0) {
    const data = [
      {
        title: 'Paradise',
        color: 'red',
        createdAt: new Date(),
      },
      {
        title: 'Krishna',
        color: 'blue',
        createdAt: new Date(),
      }
    ];

    data.forEach(tag => Tags.insert(tag));
  }
});
