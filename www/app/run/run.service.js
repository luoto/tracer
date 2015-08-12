angular.module('tracer')
  .factory('runFactory', ['$ionicPlatform', '$cordovaGeolocation', 'runModel', '$http', '$interval', function($ionicPlatform, $cordovaGeolocation, runModel, $http, $interval) {

    // stores user path [lat, long pairs]
    var pathCoordinates = [];
    var pathLine;
    var maker;

    // set up map
    var map = L.map('map', {zoomControl:false});
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    var posOptions = {timeout: 3000, enableHighAccuracy: true};

    $ionicPlatform.ready(function() {
      // get user's initial position
      // and display on map
      $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {
          var lat  = position.coords.latitude;
          var long = position.coords.longitude;
          map.setView([lat, long], 15); // [lat, long]
          marker = L.marker([lat, long]).addTo(map);
          pathLine = L.polyline([[lat, long]]).addTo(map);
          pathCoordinates.push([lat, long]);
        }, function(err) {
          console.log(err)
        });
    });

    var intervalID;


    // service methods
    return {

      startWatch: function() {
        intervalID = $interval(function() {
          $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function (position) {
              var lat  = position.coords.latitude;
              var long = position.coords.longitude;
              map.setView([lat, long], 15);
              pathLine.addLatLng([lat, long]);
              pathCoordinates.push([lat, long]);
            }, function(err) {
              // error
            });
        }, 1000);
      },

      stopWatch: function() {
        if(angular.isDefined(intervalID)) {
          $interval.cancel(intervalID);
          intervalID = undefined;
        }
      },

      reset: function() {
        $cordovaGeolocation
          .getCurrentPosition(posOptions)
          .then(function (position) {
            var lat  = position.coords.latitude;
            var long = position.coords.longitude;
            map.setView([lat, long], 15);
            marker.setLatLng([lat, long]);
            pathLine.setLatLngs([[lat, long]]);
          }, function(err) {
            // error
          });

        pathCoordinates = [];
        
      },

      getPath: function() {
        return pathCoordinates;
      }
    };
  }]);
