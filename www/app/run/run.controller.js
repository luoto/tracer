angular.module('tracer')

.controller('RunCtrl', ['$scope', 'runFactory', 'runModel', '$interval', function($scope, runFactory, runModel, $interval) {

  $scope.elapsedTime = 0;

  var counter;

  var time = {
    sec: 0,
    min: 0,
    hour: 0
  }

  $scope.start = function() {
    console.log('started');
    counter = $interval(function() {
      $scope.elapsedTime += 1;
    }, 1000);
  }

  $scope.stop = function() {
    if(angular.isDefined(counter)) {
      $interval.cancel(counter);
      counter = undefined;
      runFactory.stopWatch();
    }
  }

  $scope.save = function() {
    $scope.stop();

    var newLog = {
      date: Date.now(),
      path: runFactory.getPath()
    }

    runModel.addLog(newLog);

    // reset to intial state
    time = {
      sec: 0,
      min: 0,
      hour: 0
    };

    runFactory.reset();
  }

  $scope.$on('$destroy', function() {
    $scope.stop();
  });

}]);
