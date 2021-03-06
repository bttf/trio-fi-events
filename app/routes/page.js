import Ember from 'ember';
import ENV from 'trio-fi-events/config/environment';

var limit = ENV.APP.pageLimit;
var moment = window.moment;

export default Ember.Route.extend({
  renderTemplate: function(controller, model) {
    this.render('index', {
      controller: controller,
      model: model
    });
  },

  model: function(params) {
    var page = params.page;
    return Ember.RSVP.hash({
      page: +page,
      limit: limit,
      eventsLength: this.store.find('event', {
        orderBy: 'dateSlug',
        startAt: moment(new Date()).format('L').replace(/\//g, '-')
      }).then(function(events) {
        return events.get('length');
      }),
      events: this.store.find('event', {
        orderBy: 'dateSlug',
        startAt: moment(new Date()).format('L').replace(/\//g, '-')
      }).then(function(events) {
        var startAt = page * limit;
        var endAt = (page * limit) + limit;
        return events.slice(startAt, endAt);
      })
    });
  }
});
