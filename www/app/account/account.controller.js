angular.module('tracer')
  .controller('AccountCtrl', ['$scope', 'StartService', '$ionicModal', '$ionicPopup', 'runModel', function($scope, StartService, $ionicModal, $ionicPopup, runModel) {

    $ionicModal.fromTemplateUrl('app/account/account.modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function() {
      $scope.modal.show();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });

    $scope.user = {
      username: "",
      password: "",
    };

    $scope.create = {
      username: "",
      password: "",
      email: ""
    };

    $scope.success = false;
    $scope.error = false;

    $scope.signIn = function() {
      if($scope.user.username === undefined || $scope.user.password === undefined) {
        (function() {
          var alertPopup = $ionicPopup.alert({
            title: 'Error',
            template: 'Incorrect username or password'
          });
        })();
      }

      StartService.signIn($scope.user.username, $scope.user.password);
    };

    $scope.createAccount = function() {
      if($scope.create.username === "" || $scope.create.password === "" || $scope.create.email === "") {
        (function() {
          var alertPopup = $ionicPopup.alert({
            title: 'Error',
            template: 'Please fill in all fields'
          });
        })();
        $scope.hidden = false;
        return;
      }
      else if (StartService.createUser($scope.create.username, $scope.create.email, $scope.create.password)) {
        (function() {
          var alertPopup = $ionicPopup.alert({
            title: 'Error',
            template: 'Username or email is already in use'
          });
        })();
        $scope.hidden = false;
        return;
      }
      else {
        // (function() {
        //   var alertPopup = $ionicPopup.alert({
        //     title: 'Success',
        //     template: 'You are now logged in as ' + $scope.create.username
        //   });
        // })();
        //
        // return;
      }
    };

    $scope.signOut = function() {
      StartService.signOut();
      runModel.clearLogs();
    }

  }]);
