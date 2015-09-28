angular.module('tracer')
  .factory('StartService', ['$http', '$location', '$ionicPopup', function($http, $location, $ionicPopup) {

    var user_name, pass_word;


    return {
      createUser: function(username, email, password) {
        $http.post('http://localhost:3000/api/user/signup',
        {username: username, email: email, password: password})
          .then(function(res) {
            $location.path('tab/run');

          }, function(err) {

            (function() {
              var alertPopup = $ionicPopup.alert({
                title: 'Error',
                template: 'Username or email is already in use'
              });
            })();

            return false;
          });
      },
      signIn: function(username, password) {
        user_name = username;
        pass_word = password;

        $http.post('http://localhost:3000/api/user/login', {username: username, password: password})
          .success(function(data) {
            $location.path('tab/run');
          })
          .error(function(data) {

          });
      },
      getCredentials: function() {
        return {
          username: user_name,
          password: pass_word
        };
      },
      signOut: function() {
        $http.post('http://localhost:3000/api/user/logout')
          .success(function(data) {
            $location.path('tab/run');
          })
          .error(function(data) {
            return true;
          });
      }
    };
  }]);
