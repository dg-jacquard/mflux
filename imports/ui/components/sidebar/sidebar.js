import './sidebar.html';

Template.sidebar.onCreated(function () {
  // counter starts at 0
  // this.counter = new ReactiveVar(0);
});
//
Template.sidebar.helpers({
  isActive: function (area) {
    let a = this.area();
    return a && (a === area) ? 'active' : '';
  }
});
