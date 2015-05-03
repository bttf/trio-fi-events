import Ember from 'ember';

var $ = Ember.$;
var google = window.google;

export default Ember.Component.extend({
  classNames: ['main-map-wrapper'],
  isMapVisible: false,

  map: {},
  bounds: new google.maps.LatLngBounds(),
  geocoder: new google.maps.Geocoder(),

  onEventChange: function() {
    if (!this.get('isMapVisible')) { this.initMap(); }
  }.observes('selectedEvent'),

  initMap: function() {
    var height = 300;
    var self = this;
    $('#loadingOverlay').fadeIn(200, function() {
      $('._application').animate({
        paddingTop: height + 25
      });
      $('.app-header').animate({
        height: height
      }, function() {
        //TODO: need to implement callback for when google maps is done loading/rendering
        self.initGoogleMaps();
        $('.main-map-wrapper').show(function() {
          var map = self.get('map');
          var center = map.getCenter();
          google.maps.event.trigger(map, 'resize');
          map.setCenter(center);
          $('#loadingOverlay').fadeOut(200);
        });
      });
    });
    this.set('isMapVisible', true);
  },

  initGoogleMaps: function() {
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
  }
});
