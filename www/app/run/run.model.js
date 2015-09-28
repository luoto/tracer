angular.module('tracer')
  .factory('runModel', ['$http', 'StartService', function($http, StartService) {

    var logs = [];

    var pullData = function() {
      $http.get('http://localhost:3000/api/logs')
        .then(function(res) {

          // clean data
          var formattedLog = _.map(res.data.log, function(log) {
            var date = log.date;
            var path = _.map(log.path, function(coordinates) {
              return [coordinates.long, coordinates.lat];
            });

            return {
              date: date,
              path: path
            }
          });

          logs = formattedLog;
          return formattedLog;

        }, function(err) {
          return false;
        });
    };

    var pushData = function() {
      $http.post('http://localhost:3000/api/logs', {log: logs})
        .then(function(res) {
          logs = [];
        }, function(err) {
          return false;
        });
    };

    return {
      addLog: function(log) {
        logs = [];
        logs.push(log);
        pushData();
      },
      getLog: function() {
        pullData();
        return logs;
      },
      clearLogs: function() {
        logs = [];
      }
    };

  }]);
