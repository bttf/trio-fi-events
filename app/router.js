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
  this.route('venue', function() {
    this.route('edit');
    this.route('new');
  });
  this.route('admin');

  this.route('events', function() {
    this.route('new');
  });
  this.route('login');
});
