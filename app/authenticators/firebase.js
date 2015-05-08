import Ember from 'ember';
import Base from 'simple-auth/authenticators/base';
import ENV from 'trio-fi-events/config/environment';

var ref = new window.Firebase(ENV.firebase);

export default Base.extend({
  restore: function() {
    return new Ember.RSVP.Promise(function (resolve, reject) {
      var authData = ref.getAuth();
      if (authData) {
        resolve({ authData: authData });
      } else {
        reject();
      }
    });
  },

  authenticate: function(options) {
    return new Ember.RSVP.Promise(function (resolve, reject) {
      ref.authWithPassword({
        "email": options.email,
        "password": options.password
      }, function(error, authData) {
        if (error) {
          reject(error);
        } else {
          resolve({ authData: authData });
        }
      });
    });
  },

  invalidate: function() {
    return new Ember.RSVP.Promise(function (resolve) {
      ref.unauth();
      resolve();
    });
  }
});
