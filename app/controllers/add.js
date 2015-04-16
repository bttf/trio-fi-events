import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    addEvent: function(event) {
      var self = this;
      event.save().then(function() {
        self.set('newEvent', self.store.createRecord('event'));
      }, function(err) {
        self.set('error', err);
      });
    }
  }
});
