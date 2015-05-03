import Ember from 'ember';

export default Ember.Component.extend({
  isEditable: false,
  actions: {
    toggleEdit: function() {
      this.toggleProperty('isEditable');
    }
  }
});
