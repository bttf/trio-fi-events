import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.find('event').then(function(events) {
      return events.filter(function(event) {
        return !event.get('isNew');
      });
    });
  }
});
