/* global angular */
(function (window) {
    'use strict';

    var sampleApp = window.sampleApp = angular.module('sampleApp', ['ngRoute', 'debounceModule']);

    var config = function ($routeProvider) {
        $routeProvider.when('/home', { templateUrl: 'samples/partials/home.html', controller: 'SampleController', reloadOnSearch: false});
        $routeProvider.otherwise({ redirectTo: '/home' });
    };

    sampleApp.config(['$routeProvider', config]);

})(window);
