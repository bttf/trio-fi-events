import Ember from 'ember';

var $ = Ember.$;
var google = window.google;

export default Ember.Component.extend({
  classNames: ['mini-map-wrapper'],
  map: {},
  bounds: new google.maps.LatLngBounds(),
  geocoder: new google.maps.Geocoder(),
  city: Ember.computed.alias('venue.city'),
  name: Ember.computed.alias('venue.name'),
  toggleSearchSpinner: function(toggle) {
    var $btn = $('#searchBtn');
    if (toggle) {
      $btn.width($btn.width());
      $btn.data('btnMsg', $btn.html());
      $btn.html('<i class="fa fa-spinner fa-pulse"></i>');
    } else {
      $btn.html($btn.data('btnMsg'));
    }
  },

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

      this.toggleSearchSpinner(true);

      geocoder.geocode({ 'address': this.get('city') }, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          self.get('map').setCenter(results[0].geometry.location);

          var placeReq = {
            location: results[0].geometry.location,
            radius: 50000,
            name: self.get('name')
          };
          places.nearbySearch(placeReq, function(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              var place = results[0];
              var placeId = place.place_id;
              var marker = new google.maps.Marker({
                map: self.get('map'),
                position: place.geometry.location
              });
              places.getDetails({ placeId: placeId }, function(place, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                  var contentStr = "<h2>" + place.name + "</h2>" +
                    "<div class='place-info'>" + place.formatted_address + "</div>";
                  var infoWindow = new google.maps.InfoWindow({
                    content: contentStr
                  });
                  infoWindow.open(self.get('map'), marker);
                  self.set('name', place.name);
                  self.set('address', [place.address_components[0].short_name, place.address_components[1].short_name].join(' '));
                  self.set('city', [place.address_components[2].short_name, place.address_components[3].short_name].join(', '));
                }
              });
              self.get('map').setCenter(place.geometry.location);
              self.get('map').setZoom(10);
            } else {
            }

            self.toggleSearchSpinner(false);
          });
        } else {
          console.log("geocode error",results, status);
        }
        self.toggleSearchSpinner(false);
      });
    }
  }
});
