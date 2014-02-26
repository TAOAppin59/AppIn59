'use strict';

/* Controllers */

angular.module('myApp.controllers', ['myApp.services']).
	controller('MapCtrl', ['$scope', function($scope) {
        $scope.map = {
            center: {
                latitude: 122,
                longitude: -42
            },
            zoom: 16
        }
	}]);
