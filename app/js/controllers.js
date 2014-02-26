'use strict';

/* Controllers */

angular.module('myApp.controllers', ['myApp.services']).
	controller('MapCtrl', ['$scope', '$q', 'restaurantFinder', function($scope, $q, restaurantFinder) {
        $scope.map = {
            center: {
                latitude: 122,
                longitude: -42
            },
            zoom: 16,
            init: function() {
                $scope.map.centerMap().
                    then($scope.map.initMarkers);
            },
            centerMap: function() {
                var deferred = $q.defer();
                navigator.geolocation.getCurrentPosition(function(position) {
                    $scope.map.center = position.coords;
                    deferred.resolve(position.coords);
                });
                return deferred.promise;
            },
            initMarkers: function() {
                restaurantFinder.findNear($scope.map.center)
                    .then(function(markers) {
                        $scope.map.markers = markers;
                        $scope.map.markers[0].showWindow = true;
                    })
            }
        };
        $scope.map.init();
	}]);
