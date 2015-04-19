import DS from 'ember-data';

var attr = DS.attr;

export default DS.Model.extend({
  date: attr('date'),
  artists: attr('string'),
  venue: attr('string'),
  city: attr('string'),
  dateSlug: attr('string', {
    defaultValue: function(self) {
      return moment(self.get('date')).format('L').replace(/\//g, '-');
    }
  })
});
