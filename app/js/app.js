'use strict';

/* App Module */

var ajwApp = angular.module('ajwApp', [
  'ngRoute',
  'ajwAnimations',

  'ajwControllers'
]);

ajwApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/leaderboard', {
        templateUrl: 'partials/leaderboard.html',
        controller: 'LeaderboardCtrl'
      }).
      otherwise({
        redirectTo: '/leaderboard'
      });
  }]);
