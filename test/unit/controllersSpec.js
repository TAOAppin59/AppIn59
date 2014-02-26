'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function() {
    var scope;
    var $controllerConstructor;

    beforeEach(module('myApp.controllers'));

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        $controllerConstructor = $controller;
    }));

//    describe('MyCtrl1', function(){
//        var controller;
//
//        beforeEach(function() {
//            controller = $controllerConstructor('MyCtrl1', { $scope: scope });
//        });
//
//        it('should ....', function() {
//            //spec body
//        });
//    });
//
//    describe('MyCtrl2', function(){
//        var controller;
//
//        beforeEach(function() {
//            controller = $controllerConstructor('MyCtrl2', { $scope: scope });
//        });
//
//        it('should ....', function() {
//            //spec body
//        });
//    });
});
