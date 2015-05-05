import Ember from 'ember';

var $ = Ember.$;
var moment = window.moment;

export default Ember.Controller.extend({
  creatingVenue: false,
  selectedVenue: '',

  actions: {
    toggleCreatingVenue: function() {
      this.set('model.newVenue', this.store.createRecord('venue'));
      this.toggleProperty('creatingVenue');
    },

    saveVenue: function(venue) {
      var self = this;
      venue.save().then(function() {
        console.log('saved');
        self.set('selectedVenue', venue);
        self.set('model.newVenue', self.store.createRecord('venue'));
      });
    },

    saveEvent: function(event) {
      var self = this;
      event.set('venue', self.get('selectedVenue'));
      event.save().then(function() {
        self.set('saved', 'Event saved. ' + moment().format('MMMM Do YYYY, h:mm:ss a'));
        $('._events_new .saved-msg').fadeIn(500);
        setTimeout(function() {
          $('._events_new .saved-msg').fadeOut(5000);
        }, 500);
      }, function(err) {
        console.log('error', err);
      });
    }
  }
});
