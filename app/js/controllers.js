'use strict';

/* Controllers */

var ajwControllers = angular.module('ajwControllers', []);

var min = 0;
var max = 10;
var step = 10;
var boardData = [];

ajwControllers.controller('LeaderboardCtrl', ['$scope', '$interval', '$timeout',
            'updateBoard', function($scope, $interval, $timeout, updateBoard) {
  
  updateBoard.success( function(data) {
    boardData = data.results;
    $interval( nextGroup, 10000 );
    $scope.workoutName = data.workoutTitle;
    $scope.date = new Date( data.date );
    
    min = 0;
    max = 10;
    
    $scope.minIdx = min + 1;
    $scope.maxIdx = Math.min( max, boardData.length - 1 );
    
    $scope.leaders = boardData.slice( min, $scope.maxIdx );
    $interval( nextGroup, 10000 );
  });
  
  
  function nextGroup() {
    if( max >= boardData.length ) {
      max = boardData.length;
      $scope.leaders = boardData.slice( min, max );
      $scope.minIdx = min + 1;
      $scope.maxIdx = max;
      $timeout( updateBoard, 10000 );
    } else {
      $scope.leaders = boardData.slice( min, max );
      $scope.minIdx = min + 1;
      $scope.maxIdx = max;
      min = max;
      max += step;
    }
  };
  
}]);
