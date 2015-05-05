import DS from 'ember-data';

var attr = DS.attr;
var belongsTo = DS.belongsTo;
var moment = window.moment;

export default DS.Model.extend({
  date: attr('date'),
  artists: attr('string'),
  venue: belongsTo('venue', { async: true }),
  dateSlug: attr('string', {
    defaultValue: function(self) {
      return moment(self.get('date')).format('L').replace(/\//g, '-');
    }
  })
});
