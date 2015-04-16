import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.find('event');
  },
  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set('newEvent', this.store.createRecord('event'));
  }
});
