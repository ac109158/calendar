'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]).
  directive('bootstrap', function() {
      return {
          restrict: "E",
          templateUrl: "partials/bootstrap.html"
        }
      }).
     directive('footer', function() {
        return {
            restrict: "E",
            templateUrl: "partials/footer/footer.html"
          }
        }).
     directive('daybar', function() {
        return {
            restrict: "E",
            templateUrl: "partials/header/fullheader.html"
          }
        }).
     directive('mday', function() {
        return {
            restrict: "E",
            templateUrl: "partials/days/mDay.html"
          }
        }).
     directive('jday', function() {
        return {
            restrict: "E",
            templateUrl: "partials/days/jDay.html"
          }
        }).
     directive('fday', function() {
        return {
            restrict: "E",
            templateUrl: "partials/days/fDay.html"
          }
        }).
     directive('yday', function() {
        return {
            restrict: "E",
            templateUrl: "partials/days/yDay.html"
          }
        }).
      directive('day', function() {
          return {
              restrict: "E",
              transclude: true,
              templateUrl: "partials/days/day.html"
            }
          });