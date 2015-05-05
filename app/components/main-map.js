import Ember from 'ember';

var $ = Ember.$;
var google = window.google;

export default Ember.Component.extend({
  classNames: ['main-map-wrapper'],

  map: {},
  bounds: new google.maps.LatLngBounds(),
  geocoder: new google.maps.Geocoder(),

  onEventChange: function() {
    if (!this.get('isMapVisible')) { this.initMap(); }
  }.observes('selectedEvent'),

  closeMap: function() {
    this.set('selectedEvent', '');

    if (!this.get('isMapVisible')) {
      var $app = $('._application');
      var $appHeader = $('.app-header');
      $('#mapToolbar').fadeOut();
      $app.animate({
        paddingTop: $app.data('origPadding')
      });
      $appHeader.animate({
        height: $appHeader.data('origHeight')
      }, function() {
        $('.main-map-wrapper').fadeOut(200);
      });
    }
  }.observes('isMapVisible'),

  initMap: function() {
    var height = 300;
    var self = this;
    $('#loadingOverlay').fadeIn(200, function() {
      var $app = $('._application');
      var $appHeader = $('.app-header');
      $app.data('origPadding', $app.css('paddingTop'));
      $app.animate({
        paddingTop: height + 25
      });
      $appHeader.data('origHeight', $appHeader.css('height'));
      $appHeader.animate({
        height: height
      }, function() {
        //TODO: need to implement callback for when google maps is done loading/rendering
        self.initGoogleMaps();
        $('.main-map-wrapper').show(function() {
          var map = self.get('map');
          var center = map.getCenter();
          google.maps.event.trigger(map, 'resize');
          map.setCenter(center);
          $('#mapToolbar').show();
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
