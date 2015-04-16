import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['add-event-toolbar'],
  actions: {
    addEvent: function() {
      this.set('event.date', new Date(this.get('event.date')));
      this.sendAction('add', this.get('event'));
    }
  }
});
