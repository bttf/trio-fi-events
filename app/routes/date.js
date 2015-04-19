import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {

    var date = new Date(params.dateSlug.replace(/-/g,'/'));

    return Ember.RSVP.hash({
      thisDate: date,
      events: this.store.find('event', {
        orderBy: 'date',
        limitToFirst: 20
      }).then(function(events) {
        return events.filter(function(event) {
          var out = event.get('date').toString() === date.toString();
          console.log('out?: ', out);
          console.log('event.get(date)', event.get('date'));
          console.log('thisDate', date.toString());
          return out;
        });
      })
    });
  }
});
