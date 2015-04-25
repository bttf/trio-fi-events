import Ember from 'ember';

export default Ember.Component.extend({
  pages: function() {
    var length = this.get('eventsLength');
    var numOfPages = Math.ceil(length / this.get('limit'));
    var pages = [];
    for (var i = 0; i < numOfPages; i++) {
      pages.push({
        num: i,
        active: i === this.get('currentPage') ? true : false
      });
    }
    return pages;
  }.property('currentPage', 'limit')
});
