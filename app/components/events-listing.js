import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['events-listing'],

  actions: {
    loadEvent: function(event) {
      this.sendAction('onEventSelect', event);
    }
  }
});
