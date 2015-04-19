import Ember from 'ember';

export default Ember.Route.extend({

  model: function(params) {
    return Ember.RSVP.hash({
      thisDate: params.dateSlug,
      events: this.store.find('event', {
        orderBy: 'dateSlug',
        equalTo: params.dateSlug
      })
    });
  }
});
