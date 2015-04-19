import Ember from 'ember';

var $ = Ember.$;

export default Ember.Component.extend({
  classNames: ['main-map-wrapper'],
  map: {},
  bounds: new google.maps.LatLngBounds(),

  initMap: function() {
    var mapOptions = {
      zoom: 6,
      center: new google.maps.LatLng(25.762877, -80.194498),
      disableDefaultUI: true
    };

    this.set('map', new google.maps.Map(document.getElementById('mainMap'), mapOptions));
    this.placeEventMarkers();
  }.on('didInsertElement'),

  placeEventMarkers: function() {
    var self = this;
    var geocoder = new google.maps.Geocoder(); 
    var places = new google.maps.places.PlacesService(self.get('map'));

    this.get('events').forEach(function(event) {
      geocoder.geocode({ 'address': event.get('city') }, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          var city = results[0].geometry.location;
          var request = {
            location: city,
            name: event.get('venue'),
            radius: 50000
          };

          places.nearbySearch(request, function(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              var place = results[0];
              var marker = new google.maps.Marker({
                map: self.get('map'),
                position: place.geometry.location
              });
              self.get('bounds').extend(place.geometry.location);
              //self.get('map').fitBounds(self.get('bounds'));
              self.get('map').setCenter(self.get('bounds').getCenter());
            } else {
              console.log('places NOT OK');
            }
          });
        }
      });
    });
  }
});
