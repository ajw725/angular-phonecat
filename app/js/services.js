'use strict';

/* Services */

var ajwServices = angular.module( 'ajwServices', ['ngResource'] );

ajwServices.factory( 'updateBoard', ['$http', function($http) {
  return $http({
    url: 'https://apis.trainheroic.com/public/leaderboard/468425',
    method: 'GET'
  })
    .success( function(data) {
      return data;
    })
    .error( function(err) {
      return err;
    });
}]);
