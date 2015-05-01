import Ember from 'ember';
import ENV from 'trio-fi-events/config/environment';

var limit = ENV.APP.pageLimit;

export default Ember.Route.extend({
  model: function() {
    return Ember.RSVP.hash({
      page: 0,
      limit: limit,
      eventsLength: this.store.find('event', {
        orderBy: 'dateSlug',
        startAt: moment(new Date).format('L').replace(/\//g, '-')
      }).then(function(events) {
        return events.get('length');
      }),
      events: this.store.find('event', {
        orderBy: 'dateSlug',
        startAt: moment(new Date).format('L').replace(/\//g, '-')
      }).then(function(events) {
        return events.slice(0, limit);
      })
    });
  }
});
