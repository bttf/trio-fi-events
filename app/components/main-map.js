import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['main-map-wrapper'],
  map: {},
  bounds: new google.maps.LatLngBounds(),
  initMap: function() {
    var self = this;
    var geocoder = new google.maps.Geocoder(); 
    geocoder.geocode( { 'address': 'Florida' }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var mapOptions = {
          zoom: 6,
          center: results[0].geometry.location
        };
        self.set('map', new google.maps.Map(document.getElementById('mainMap'), mapOptions));
      } else {
        console.log('error');
      }

      self.get('events').forEach(function(e) {
        var address = e.get('city');
        geocoder.geocode({ 'address': address }, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            var marker = new google.maps.Marker({
              position: results[0].geometry.location,
              map: self.get('map')
            });
            self.get('bounds').extend(results[0].geometry.location);
            //self.get('map').fitBounds(self.get('bounds'));
            self.get('map').setCenter(self.get('bounds').getCenter());
          }
        });
      });
    });
  }.on('didInsertElement'),
});
