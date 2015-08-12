angular.module('tracer')

.controller('RunCtrl', ['$scope', 'runFactory', 'runModel', '$interval', function($scope, runFactory, runModel, $interval) {

  $scope.elapsedTime = 0;

  var counter;
  
  var time = {
    sec: 0,
    min: 0,
    hour: 0
  }

  // $scope.time = '0:0:0';
  // var startTime;
  // var endTime;
  //
  // var sec = 0;
  // var min = 0;
  // var hour = 0;
  //
  // var intervalID = null;

  $scope.start = function() {
    console.log('started');
    counter = $interval(function() {
      $scope.elapsedTime += 1;
    }, 1000);

    // startTime = Date.now();
    // runFactory.startWatch();
    //
    // intervalID = setInterval(function() {
    // sec += 1;
    //
    // if (sec % 60 === 0 && sec !== 0) {
    //   min += 1;
    //   sec = 0;
    // }
    // if (min % 60 === 0 && min !== 0) {
    //   hour += 1;
    //   min = 0;
    // }
    //
    // $scope.time = hour + ':' + min + ':' + sec;
    // $scope.$apply();
    // }, 1000);
  }

  $scope.stop = function() {
    if(angular.isDefined(counter)) {
      $interval.cancel(counter);
      counter = undefined;
    }

    // endTime = Date.now();
    // clearInterval(intervalID);
    // intervalID = null;
    // runFactory.stopWatch();
  }

  $scope.save = function() {
    $scope.stop();

    // var newLog = {
    //   date: Date.now(),
    //   path: runFactory.getPath()
    // }
    //
    // runModel.addLog(newLog);
    //
    // // reset to intial state
    // startTime = 0;
    // endTime = 0;
    // sec = 0;
    // min = 0;
    // hour = 0;
    //
    // runFactory.reset();
  }

  $scope.$on('$destroy', function() {
    $scope.stop();
  })

}]);
