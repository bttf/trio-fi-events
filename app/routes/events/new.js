import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.createRecord('event');
    // return new Ember.RSVP.hash({
    //   event: this.store.createRecord('event'),
    //   venues: this.store.find('venue'),
    //   newVenue: {}
    // });
  },

  afterModel: function(model) {
    model.set('venues', this.store.find('venue'));
    model.set('newVenue', '');
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set('saved', '');
    controller.set('selectedVenue', '');
  }
});
