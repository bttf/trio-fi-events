import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  setupController: function(controller) {
    controller.set('isMapVisible', false);
  },

  actions: {
    loadEvent: function(event) {
      this.controller.set('selectedEvent', event);
    },
    closeMap: function() {
      this.controller.set('isMapVisible', false);
    },
    login: function(email, password) {
      this.get('session').authenticate('authenticator:firebase', {
        email: email,
        password: password
      });
    },
    logout: function() {
      console.log('click registered');
      this.get('session').invalidate('authenticator:firebase');
    }
  }
});
