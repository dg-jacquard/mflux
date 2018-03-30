import './nav.html';

Template.nav.onCreated(function () {
  // counter starts at 0
  // this.counter = new ReactiveVar(0);
});
//
Template.nav.helpers({
  isActive: function (area) {
    let a = this.area();
    return a && (a === area) ? 'active' : '';
  }
});

// Template.hello.events({
//   'click button'(event, instance) {
//     // increment the counter when button is clicked
//     instance.counter.set(instance.counter.get() + 1);
//   },
// });
