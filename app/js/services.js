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
                var resourceProxy = $resource(this.url + apiUrl);
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
    }]);
