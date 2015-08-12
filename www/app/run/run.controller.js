angular.module('tracer')

.controller('RunCtrl', ['$scope', 'runFactory', 'runModel', '$interval', function($scope, runFactory, runModel, $interval) {

  $scope.elapsedTime = 0;

  var counter;

  $scope.start = function() {
    runFactory.startWatch();
    counter = $interval(function() {
      $scope.elapsedTime += 1;
    }, 1000);
  };

  $scope.stop = function() {
    if(angular.isDefined(counter)) {
      $interval.cancel(counter);
      counter = undefined;
    }
    runFactory.stopWatch();
  };

  $scope.save = function() {
    $scope.stop();

    var newLog = {
      date: Date.now(),
      path: runFactory.getPath()
    }

    runModel.addLog(newLog);
    runFactory.reset();
    $scope.elapsedTime = 0;
  };

  $scope.$on('$destroy', function() {
    $scope.stop();
  });

}]);
