angular.module('tracer')

.controller('ControlsCtrl', ['$scope', function($scope) {

  var map = L.map('map', {zoomControl:false}).setView([51.505, -0.09], 13);
  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

  $scope.time = 100;

}]);
