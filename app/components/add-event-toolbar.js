import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['add-event-toolbar'],
  actions: {
    addEvent: function() {
      this.sendAction('add', this.get('event'));
    }
  }
});
