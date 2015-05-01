import Ember from 'ember';

export default Ember.Controller.extend({
  creatingVenue: false,

  actions: {
    toggleCreatingVenue: function() {
      this.toggleProperty('creatingVenue');
    }
  }
});
