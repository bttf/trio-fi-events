import Ember from 'ember';

var google = window.google;

export default Ember.Component.extend({
  classNames: ['main-map-wrapper'],
  map: {},
  bounds: new google.maps.LatLngBounds(),
  geocoder: new google.maps.Geocoder(),

  initMap: function() {
    var geocoder = this.get('geocoder');
    var mapOptions = {
      zoom: 7,
      center: new google.maps.LatLng(25.762877, -80.194498),
      disableDefaultUI: true
    };

    geocoder.geocode({ 'address': 'Miami, FL' }, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        mapOptions.center = results[0].geometry.location;
      }
    });

    this.set('map', new google.maps.Map(document.getElementById('mainMap'), mapOptions));
  }.on('didInsertElement')
});
