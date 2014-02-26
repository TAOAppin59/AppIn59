'use strict';

/* Controllers */

angular.module('myApp.controllers', ['myApp.services']).
	controller('MapCtrl', ['$scope', function($scope) {
        $scope.map = {
            center: {
                latitude: 122,
                longitude: -42
            },
            zoom: 16,
            init: function() {
                $scope.map.centerMap();
            },
            centerMap: function() {
                navigator.geolocation.getCurrentPosition(function(position) {
                    $scope.map.center = position.coords;
                });
            }
        };
        $scope.map.init();
	}]);
