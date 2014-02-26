'use strict';

/* Filters */

angular.module('myApp.filters', [])
    .filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
  }])
    .value('goodThreshold', 90)
    .value('cautionThreshold', 75)
    .filter('markerClass', ['goodThreshold', 'cautionThreshold', function(goodThreshold, cautionThreshold) {
        return function (score) {
            if (score > goodThreshold) {
                return 'green';
            }
            if (score > cautionThreshold) {
                return 'yellow';
            }
            return 'red';
        };
    }])
    .filter('markerIcon', ['goodThreshold', 'cautionThreshold', function(goodThreshold, cautionThreshold) {
        return function (score) {
            if (score > goodThreshold) {
                return 'img/star.png';
            }
            if (score > cautionThreshold) {
                return 'img/caution.png';
            }
            return 'img/skull.png';
        };
    }]);
