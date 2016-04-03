'use strict';

/* App Module */

var ajwApp = angular.module('ajwApp', [
  'ngRoute',
  'ajwControllers',
  'ajwDirectives',
  'ajwAnimations'
]);

ajwApp.config( function($routeProvider) {
  $routeProvider
    .when( '/', {
      controller: 'LeaderboardCtrl',
      templateUrl: 'partials/leaderboard.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});
