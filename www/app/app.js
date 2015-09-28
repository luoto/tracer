angular.module('tracer', ['ionic', 'ngCordova', 'ngCookies'])

.run(['$ionicPlatform', '$http', '$cookies', function($ionicPlatform, $http, $cookies) {

  $ionicPlatform.ready(function() {

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleLightContent();
    }
  });

    // Allows cookies to persist
    $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;

}])

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  $stateProvider

  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'app/common/tabs.html'
  })

  .state('tab.run', {
      url: '/run',
      views: {
        'tab-run': {
          templateUrl: 'app/run/run.tmpl.html',
          controller: 'RunCtrl'
        }
      }
    })

  .state('tab.log', {
      url: '/log',
      cache: false,
      views: {
        'tab-log': {
          templateUrl: 'app/log/log.tmpl.html',
          controller: 'LogsCtrl'
        }
      }
    })

    .state('tab.account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'app/account/account.tmpl.html',
          controller: 'AccountCtrl'
        }
      }
    });

  $urlRouterProvider.otherwise('/tab/run');

  // Fixes for CORS issues.
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
  $httpProvider.defaults.withCredentials = true;
});
