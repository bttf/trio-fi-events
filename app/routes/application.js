import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  actions: {
    loadEvent: function(event) {
      this.controller.set('selectedEvent', event);
    },
    login: function(email, password) {
      this.get('session').authenticate('authenticator:firebase', {
        email: email,
        password: password
      });
    },
    logout: function() {
      this.get('session').invalidate('authenticator:firebase');
    }
  }
});
