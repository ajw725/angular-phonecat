'use strict';

/* Controllers */

var ajwControllers = angular.module('ajwControllers', []);

var min = 0;
var max = 10;
var step = 10;

ajwControllers.controller('LeaderboardCtrl', ['$scope', '$http', '$timeout',
                                          function($scope, $http, $timeout) {
  
  var oldRanks = {},
      newRanks = {},
      boardData = [];
  
  function updateData() {
    $http.get( 'https://apis.trainheroic.com/public/leaderboard/468425' )
      .success( function(data) {
        oldRanks = newRanks;
        newRanks = {};
        boardData = data.results;
        $scope.nAthletes = boardData.length;
        
        for( var i = 0; i < boardData.length; i++ ) {
          var leader = boardData[i];
          newRanks[leader.username] = leader.rank;
        }
        
        $scope.workoutName = data.workoutTitle;
        $scope.date = new Date( data.date );
        $scope.tests = data.tests;
        
        min = 0;
        max = 10;
        $scope.minIdx = min + 1;
        $scope.maxIdx = Math.min( max, boardData.length - 1 );
        
        nextGroup();
      })
      .error( function(err) {
        console.log( 'An error occurred fetching data' );
        $timeout( updateData, 10000 ); // try again in 10 seconds if error
      });
  };
  
  function nextGroup() {
    if( max >= boardData.length ) {
      max = boardData.length;
      $scope.leaders = boardData.slice( min, max );
      
      for( var i = 0; i < $scope.leaders.length; i++ ) {
        var leader = $scope.leaders[i];
        var change = rankChange( leader.username );
        if( change > 0 ) {
          $scope.leaders[i].rankChange = '+' + change.toString();
          $scope.leaders[i].rankClass = "rank-change-up";
        } else if( change < 0 ) {
          $scope.leaders[i].rankChange = '-' + change.toString();
          $scope.leaders[i].rankClass = "rank-change-down";
        } else {
          $scope.leaders[i].rankChange = '+0';
        }
      }
      
      $scope.minIdx = min + 1;
      $scope.maxIdx = max;
      $timeout( updateData, 10000 );
    } else {
      $scope.leaders = boardData.slice( min, max );
      
      for( var i = 0; i < $scope.leaders.length; i++ ) {
        var leader = $scope.leaders[i];
        var change = rankChange( leader.username );
        if( change > 0 ) {
          $scope.leaders[i].rankChange = '+' + change.toString();
          $scope.leaders[i].rankClass = "rank-change-up";
        } else if( change < 0 ) {
          $scope.leaders[i].rankChange = '-' + change.toString();
          $scope.leaders[i].rankClass = "rank-change-down";
        } else {
          $scope.leaders[i].rankChange = '+0';
          $scope.leaders[i].rankClass = "rank-change";
        }
      }
      
      $scope.minIdx = min + 1;
      $scope.maxIdx = max;
      min = max;
      max += step;
      $timeout( nextGroup, 10000 );
    }
  };
  
  function rankChange( username ) {
    if( username in oldRanks && username in newRanks ) {
      return newRanks[username] - oldRanks[username]
    } else {
      return '0';
    }
  };
  
  updateData();
}]);
