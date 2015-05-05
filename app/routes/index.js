import Ember from 'ember';
import ENV from 'trio-fi-events/config/environment';

var limit = ENV.APP.pageLimit;

export default Ember.Route.extend({
  model: function() {
    return this.store.find('event').then(function(events) {
      return events.filter(function(event) {
        return !event.get('isNew');
      });
    });
  }
});
