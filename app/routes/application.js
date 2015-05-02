import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    loadEvent: function(event) {
      this.controller.set('selectedEvent', event);
    }
  }
});
