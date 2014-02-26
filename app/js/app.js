'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', ['ngRoute', 'ngResource', 'myApp.controllers', 'myApp.filters', 'myApp.services', 'myApp.directives', 'google-maps']).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/map', {templateUrl: 'partials/map.html', controller: 'MapCtrl'});
        $routeProvider.otherwise({redirectTo: '/map'});
    }]);
