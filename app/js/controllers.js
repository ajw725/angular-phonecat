'use strict';

/* Controllers */

var ajwControllers = angular.module('ajwControllers', []);

var min = 0;
var max = 10;
var step = 10;

var boardData = [];

ajwControllers.controller('LeaderboardCtrl', ['$scope', '$http', '$timeout',
                                          function($scope, $http, $timeout) {
  
  function updateData() {
    $http.get( 'https://apis.trainheroic.com/public/leaderboard/468425' )
      .success( function(data) {
        boardData = data.results;
        $scope.workoutName = data.workoutTitle;
        $scope.date = new Date( data.date );
        
        min = 0;
        max = 10;
        $scope.minIdx = min + 1;
        $scope.maxIdx = Math.min( max, boardData.length - 1 );
        
        nextGroup();
      })
      .error( function(err) {
        console.log( 'oops' );
        $timeout( updateData, 10000 ); // try again in a minute if error
      });
  };
  
  function nextGroup() {
    if( max >= boardData.length ) {
      max = boardData.length;
      $scope.leaders = boardData.slice( min, max );
      $scope.minIdx = min + 1;
      $scope.maxIdx = max;
      $timeout( updateData, 10000 );
    } else {
      $scope.leaders = boardData.slice( min, max );
      $scope.minIdx = min + 1;
      $scope.maxIdx = max;
      min = max;
      max += step;
      $timeout( nextGroup, 10000 );
    }
  };
  
  updateData();
}]);
