import Ember from 'ember';

var $ = Ember.$;

export default Ember.Component.extend({
  classNames: ['mini-map-wrapper'],
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
      console.log("shiet");
    }
  }
});
