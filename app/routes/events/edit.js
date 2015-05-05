import Ember from 'ember';

export default Ember.Route.extend({
  controllerName: 'events.new',
  templateName: 'events.new',

  model: function(params) {
    return this.store.find('event', params.id);

    // return new Ember.RSVP.hash({
    //   event: this.store.find('event', params.id),
    //   venues: this.store.find('venue'),
    //   newVenue: ''
    // });
  },

  afterModel: function(model) {
    model.set('venues', this.store.find('venue'));
    model.set('newVenue', '');
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set('saved', '');
    controller.set('selectedVenue', model.get('event.venue'));
  }
});
