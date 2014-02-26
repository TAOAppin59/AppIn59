'use strict';

/* jasmine specs for filters go here */

describe('filter', function () {
    beforeEach(module('myApp.filters'));


    describe('interpolate', function () {
        beforeEach(module(function ($provide) {
            $provide.value('version', 'TEST_VER');
        }));


        it('should replace VERSION', inject(function (interpolateFilter) {
            expect(interpolateFilter('before %VERSION% after')).toEqual('before TEST_VER after');
        }));
    });

    describe('goodThreshold', function () {
        it('should be 90', inject(function(goodThreshold) {
            expect(goodThreshold).toEqual(90);
        }));
    });

    describe('cautionThreshold', function() {
        it('should be 75', inject(function(cautionThreshold) {
            expect(cautionThreshold).toEqual(75);
        }));
    });

    describe('markerClass', function() {
        it('should return green if above good threshold', inject(function(goodThreshold, markerClassFilter) {
            expect(markerClassFilter(goodThreshold + 1)).toEqual('green');
            expect(markerClassFilter(goodThreshold)).not.toEqual('green');
        }));

        it('should return yellow if above caution threshold', inject(function(cautionThreshold, markerClassFilter) {
            expect(markerClassFilter(cautionThreshold + 1)).toEqual('yellow');
            expect(markerClassFilter(cautionThreshold)).not.toEqual('yellow');
        }));

        it('should return red if below caution threshold', inject(function(cautionThreshold, markerClassFilter) {
            expect(markerClassFilter(cautionThreshold)).toEqual('red');
            expect(markerClassFilter(cautionThreshold + 1)).not.toEqual('red');
        }));
    });

    describe('markerIcon', function() {
        it('should return star if above good threshold', inject(function(goodThreshold, markerIconFilter) {
            expect(markerIconFilter(goodThreshold + 1)).toEqual('img/star.png');
            expect(markerIconFilter(goodThreshold)).not.toEqual('img/star.png');
        }));

        it('should return caution if above caution threshold', inject(function(cautionThreshold, markerIconFilter) {
            expect(markerIconFilter(cautionThreshold + 1)).toEqual('img/caution.png');
            expect(markerIconFilter(cautionThreshold)).not.toEqual('img/caution.png');
        }));

        it('should return skull if below caution threshold', inject(function(cautionThreshold, markerIconFilter) {
            expect(markerIconFilter(cautionThreshold)).toEqual('img/skull.png');
            expect(markerIconFilter(cautionThreshold + 1)).not.toEqual('img/skull.png');
        }));
    });
});
