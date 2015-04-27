import Ember from 'ember';

var $ = Ember.$;

export default Ember.Component.extend({
  classNames: ['mini-map-wrapper'],
  map: {},
  bounds: new google.maps.LatLngBounds(),
  geocoder: new google.maps.Geocoder(),
  proxyVenue: function() {
    return this.get('venue');
  }.property(),
  proxyCity: function() {
    return this.get('city');
  }.property(),

  initMap: function() {
    var geocoder = this.get('geocoder');
    var mapOptions = {
      zoom: 7,
      center: new google.maps.LatLng(25.762877, -80.194498),
      disableDefaultUI: true
    };

    geocoder.geocode({ 'address': this.get('city') }, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        mapOptions.center = results[0].geometry.location;
      }
    });

    // this won't work well with multiple mini maps
    // todo: find better way to select element within this component
    this.set('map', new google.maps.Map(document.getElementById('miniMap'), mapOptions));
  }.on('didInsertElement'),

  actions: {
    updateMap: function() {
      var self = this;
      var geocoder = this.get('geocoder');
      var places = new google.maps.places.PlacesService(this.get('map'));

      geocoder.geocode({ 'address': this.get('proxyCity') }, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          self.get('map').setCenter(results[0].geometry.location);

          var placeReq = {
            location: results[0].geometry.location,
            radius: 50000,
            name: self.get('proxyVenue')
          };
          places.nearbySearch(placeReq, function(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              var place = results[0];
              var marker = new google.maps.Marker({
                map: self.get('map'),
                position: place.geometry.location
              });
              console.log('shit', place.geometry.location);
              self.get('map').setCenter(place.geometry.location);
              self.get('map').setZoom(10);
            }
          });
        }
      });
    }
  }
});
