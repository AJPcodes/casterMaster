// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('casterMaster', ['ionic', 'casterMaster.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  // .state('app.search', {
  //   url: '/search',
  //   views: {
  //     'menuContent': {
  //       templateUrl: 'templates/search.html'
  //     }
  //   }
  // })

  // .state('app.browse', {
  //     url: '/browse',
  //     views: {
  //       'menuContent': {
  //         templateUrl: 'templates/browse.html'
  //       }
  //     }
  //   })
    .state('app.home', {
      url: '/castermaster',
      views: {
        'menuContent': {
          templateUrl: 'templates/castermaster.html',
          controller: 'ListCtrl'
        }
      }
    })

    .state('app.list', {
      cache: false,
      url: '/:list',
      views: {
        'menuContent': {
          templateUrl: 'templates/list.html',
          controller: 'ListCtrl'
        }
      }
    })

    //the ":" sets a variable to be used
    .state('app.item', {
      cache: false,
      url: '/:list/:item',
      views: {
        'menuContent': {
          templateUrl: 'templates/item.html',
          controller: 'ListCtrl'
        }
      }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/castermaster');
});
