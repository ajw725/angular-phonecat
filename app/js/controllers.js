'use strict';

/* Controllers */

var ajwControllers = angular.module('ajwControllers', []);
var min = 0;
var max = 10;
var step = 10;

ajwControllers.controller('LeaderboardCtrl', ['$scope', '$http', '$interval', function($scope, $http, $interval) {
  var boardData = [];
  
  function updateBoard() {
    $http({
      url: 'https://apis.trainheroic.com/public/leaderboard/468425',
      method: "GET"
    })
    .success( function(data, status, headers, config) {
      // You can set scope here 
      boardData = data.results;
      $scope.workoutName = data.workoutTitle;
      min = 0;
      max = 10;
      $scope.leaders = boardData.slice( min, Math.min(max, boardData.length - 1) );
    })
    .error( function(data, status, headers, config) {
      console.log( 'oops' );
    });
  };
  
  function nextGroup() {
    if( max > boardData.length ) {
      $scope.leaders = boardData.slice( min, boardData.length - 1 );
      min = 0;
      max = step;
    } else {
      $scope.leaders = boardData.slice( min, max );
      min = max;
      max += step;
    }
  };
  
  $(document).ready( function() {
    updateBoard();
    nextGroup();
    $interval( nextGroup, '10000' );
    $interval( updateBoard, '60000' );
  });
}]);
