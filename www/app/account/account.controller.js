angular.module('tracer')
  .controller('AccountCtrl', ['$scope', 'StartService', '$ionicModal', '$ionicPopup', function($scope, StartService, $ionicModal, $ionicPopup) {

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
      username: undefined,
      password: undefined,
    };

    $scope.create = {
      username: undefined,
      password: undefined,
      email: undefined
    }

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
      if($scope.create.username === undefined || $scope.create.password === undefined || $scope.create.email === undefined) {
        $scope.hidden = false;
        return;
      }

      if (StartService.createUser($scope.create.username, $scope.create.email, $scope.create.password)) {
        $scope.hidden = false;
        return;
      }
    };

    $scope.signOut = function() {
      StartService.signOut();
    }

  }]);
