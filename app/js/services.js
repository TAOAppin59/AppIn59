'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', ['ngResource'])
    .value('version', '0.1')
    .factory('myResourceService', ['$resource', function($resource) {
        return {
            getResource: function() {
                return $resource;
            }
        };
    }])
    .factory('proxyService', ['$resource', '$q', function($resource, $q){
        return {
            url: 'http://jsonp.jit.su/?url=',
            get:function(apiUrl){
                var resourceProxy = $resource(this.url + apiUrl, {}, {});
                var deferral = $q.defer();

                resourceProxy.get({},
                    function(data){
                        deferral.resolve(data);
                    },
                    function(data){
                        deferral.reject(data);
                    });

                return deferral.promise;
            }
        }
    }])
    .factory('restaurantHealth', ['proxyService', function(proxyService) {
        return {
            restaurantUrl: 'http://api.civicapps.org/restaurant-inspections/inspection/',
            get: function(inspectionId) {
                var url = this.restaurantUrl;
                url += inspectionId;
                return proxyService.get(url);
            }
        };
    }])
    .factory('restaurantFinder', ['$q', 'proxyService', function($q, proxyService) {
        return {
            inspectionUrl: 'http://api.civicapps.org/restaurant-inspections/near/',
            findNear: function(location) {
                var url = this.inspectionUrl;
                var deferred = $q.defer();
                url += (location.longitude + ',' + location.latitude);
                url += ('?since=' + moment().subtract(6, 'months').format('YYYY-MM-DD'));
                url += ('&count=30&distance=.5');
                var proxyPromise = proxyService.get(encodeURIComponent(url));

                proxyPromise.then(
                    function (results) {
                        var returnArray = [];
                        angular.forEach(results.results, function(restaurant, key) {
                            returnArray.push({
                                name: restaurant.name,
                                score: restaurant.score,
                                location: {
                                    latitude: restaurant.location.Latitude,
                                    longitude: restaurant.location.Longitude
                                },
                                address: restaurant.address,
                                inspection_id: restaurant.inspection_id
                            })
                        });
                        deferred.resolve(returnArray);
                    }
                );

                return deferred.promise;
            }
        };
    }]);
