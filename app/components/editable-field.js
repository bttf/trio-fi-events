import Ember from 'ember';

var $ = Ember.$;

export default Ember.Component.extend({
  isEditable: false,
  actions: {
    toggleEdit: function() {
      this.toggleProperty('isEditable');
    }
  }
});
