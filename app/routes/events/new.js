import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return new Ember.RSVP.hash({
      event: this.store.createRecord('event'),
      venues: this.store.find('venue'),
      newVenue: this.store.createRecord('venue')
    });
  }
});
