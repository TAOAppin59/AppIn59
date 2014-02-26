'use strict';

/* jasmine specs for services go here */

describe('service', function () {
    beforeEach(module('myApp.services'));

    describe('version', function () {
        it('should return current version', inject(function (version) {
            expect(version).toEqual('0.1');
        }));
    });

    describe('myResourceService', function() {
        it('should have a getResource method',inject(function(myResourceService, $resource) {
            var resource = myResourceService.getResource();

            expect(resource).toBe($resource);
        }));
    });

    describe('proxyService', function() {
        it('should have a property that defines teh JsonP Url',inject(function(proxyService) {

            expect(proxyService.url).toEqual('http://jsonp.jit.su/?url=');
        }));

        it('should return a object',inject(function(proxyService) {

            expect(typeof proxyService.get()).toEqual('object');
        }));
    });

    describe('restaurantHealth', function() {
        it('should have a property that defines the restaurant health api url', inject(function(restaurantHealth){
            expect(restaurantHealth.restaurantUrl).toEqual('http://api.civicapps.org/restaurant-inspections/inspection/');
        }));
    });
});
