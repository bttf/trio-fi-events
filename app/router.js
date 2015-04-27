import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
  this.route('add');
  this.route('date', { path: '/date/:dateSlug' });
  this.route('page', { path: '/:page' });
  this.resource('event', { path: '/event/:id' }, function() {
    this.route('edit', { path: '/edit' });
  });
});
