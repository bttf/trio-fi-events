import DS from 'ember-data';

var attr = DS.attr,
    hasMany = DS.hasMany;

export default DS.Model.extend({
  name: attr('string'),
  address: attr('string'),
  city: attr('string'),
  loc: attr('string'),
  events: hasMany('event')
});
