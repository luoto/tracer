angular.module('tracer')
  .directive('map', function() {
    return {
      restrict: 'E',
      scope: '@',
      templateUrl: 'app/log/mapTemplate.html',
      controller: function() {

      },
      controllerAs: 'map',
      link: function ($scope, element, attrs) {

        var str = attrs.path.replace(/[\[\]]+/g, '').split(',');
        var sequence = _.map(str, function(n) {
          return Number(n);
        })
        var path = _.chunk(sequence, 2);


        var mapbox = element.find('div').children()[0];
        var map = L.map(mapbox, {zoomControl:false});
        map.setView(path[0], 15);
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        L.polyline(path).addTo(map);
      },
    }
  });
