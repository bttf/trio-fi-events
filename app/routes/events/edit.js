import Ember from 'ember';

export default Ember.Route.extend({
  controllerName: 'events.new',
  templateName: 'events.new',

  model: function(params) {
    return this.store.find('event', params.id);
  },

  afterModel: function(model) {
    model.set('venues', this.store.find('venue'));
    model.set('newVenue', '');
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set('saved', '');
    controller.set('creatingVenue', false);
    controller.set('selectedVenue', model.get('venue'));
  }
});
