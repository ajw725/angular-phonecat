'use strict';

/* Controllers */

var ajwControllers = angular.module('ajwControllers', []);
var min = 0;
var max = 10;
var step = 10;

ajwControllers.controller('LeaderboardCtrl', function($scope, $http, $interval) {
  var boardData = [];
  
  function updateBoard() {
    $http({
      url: 'https://apis.trainheroic.com/public/leaderboard/468425',
      method: "GET"
    })
    .success( function(data, status, headers, config) {
      boardData = data.results;
      $scope.workoutName = data.workoutTitle;
      $scope.date = new Date( data.date );
      
      min = 0;
      max = 10;
      
      $scope.minIdx = min + 1;
      $scope.maxIdx = Math.min( max, boardData.length - 1 );
      
      $scope.leaders = boardData.slice( min, $scope.maxIdx );
    })
    .error( function(data, status, headers, config) {
      console.log( 'oops' );
    });
    
    $interval( updateBoard, 60000 );
  };
  
  function nextGroup() {
    
    if( max >= boardData.length ) {
      max = boardData.length;
      $scope.leaders = boardData.slice( min, max );
      $scope.minIdx = min + 1;
      $scope.maxIdx = max;
      min = 0;
      max = step;
    } else {
      $scope.leaders = boardData.slice( min, max );
      $scope.minIdx = min + 1;
      $scope.maxIdx = max;
      min = max;
      max += step;
    }
  };
  
  updateBoard();
  $interval( nextGroup, 10000 );
});
