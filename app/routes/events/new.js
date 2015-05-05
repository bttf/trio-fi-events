import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.createRecord('event');
  },

  afterModel: function(model) {
    //model.set('venues', this.store.find('venue'));
    this.store.find('venue').then(function(venues) {
      model.set('venues', venues.filter(function(venue) {
        return !venue.get('isNew');
      }));
    });
    model.set('newVenue', '');
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set('saved', '');
    controller.set('creatingVenue', false);
    controller.set('selectedVenue', '');
  }
});
