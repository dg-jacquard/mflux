import { Tags } from '/imports/api/tags/tags.js';
import { Meteor } from 'meteor/meteor';
import './tags.html';

Template.tags.onCreated(function () {
  Meteor.subscribe('tags.all');
  this.editTag = new ReactiveVar(null);
});

Template.tags.helpers({
  tags() {
    if(!Meteor.user()) return [];
    return Tags.find({ user: Meteor.userId() });
  },
  editTag() {
    return Template.instance().editTag.get();
  }
});

Template.tags.events({
  'click .edit' (event, template) {
    event.preventDefault();
    template.editTag.set(this._id);
    console.log(this);
  },
  "click .remove"(event) {
    Meteor.call("tags.remove", this._id, (error, ret) => {
      console.log(error, ret);
    });
  },
  'submit .tag-edit'(event, template) {
    event.preventDefault();

    const target = event.target;
    const title = target.title.value.trim();
    const color = target.color.value;

    template.editTag.set(null);

    Meteor.call('tags.update', target.dataset.id, title, color, (error) => {
      if (error) {
        alert(error.error);
      }
    });
  },
  'submit .tag-add'(event) {
    event.preventDefault();

    const target = event.target;
    const title = target.title.value.trim();
    const color = target.color.value.trim();

    Meteor.call('tags.insert', title, color, (error) => {
      if (error) {
        alert(error.error);
      } else {
        event.target.reset();
      }
    });
  },
});
