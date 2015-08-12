 angular.module('tracer')
  .controller('LogsCtrl', ['$scope', 'runModel', function($scope, runModel){

    $scope.logs = formattedLog;

    var logs = runModel.getLog();

    var formattedLog = _.map(logs, function(log) {
      return {
        date: new Date(log.date).toDateString(),
        elapsed: new Date(log.endTime) - new Date(log.startTime),
        path: log.path
      }
    });

    $scope.refresh = function() {
      var logs = runModel.getLog();

      var formattedLog = _.map(logs, function(log) {
        return {
          date: new Date(log.date).toDateString(),
          elapsed: new Date(log.endTime) - new Date(log.startTime),
          path: log.path
        }
      });

      $scope.logs = formattedLog;
      $scope.$broadcast('scroll.refreshComplete');
      $scope.$apply()
    }

  }]);
