import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['main-map-wrapper'],
  initMap: function() {
    var geocoder = new google.maps.Geocoder(); 
    geocoder.geocode( { 'address': 'Florida' }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var mapOptions = {
          zoom: 7,
          center: results[0].geometry.location
        };
        var map = new google.maps.Map(document.getElementById('mainMap'), mapOptions);
      } else {
        console.log('error');
      }
    });
  }.on('didInsertElement')
});
