'use strict';

/* Services */

var ajwServices = angular.module( 'ajwServices', ['ngResource'] );

ajwServices.factory( 'updateBoard', ['$http', function($http) {
  return $http.get( 'https://apis.trainheroic.com/public/leaderboard/468425' )
    .success( function(data) {
      return data;
    })
    .error( function(err) {
      return err;
    });
}]);
