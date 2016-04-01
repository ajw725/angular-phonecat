'use strict';

/* Directives */

var ajwDirectives = angular.module( 'ajwDirectives', [] );

ajwDirectives.directive( 'leaderInfo', function() {
  return {
    restrict: 'E',
    scope: {
      leader: '='
    },
    templateUrl: 'partials/leaderInfo.html'
  };
});
