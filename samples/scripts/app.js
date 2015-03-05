/* global angular */
(function (window) {
    'use strict';

    var sampleApp = window.sampleApp = angular.module('sampleApp', ['ngRoute', 'debounceModule', 'throttleModule']);

    var config = function ($routeProvider) {
        $routeProvider.when('/debounce', { templateUrl: 'samples/partials/debounce.html', controller: 'SampleController', reloadOnSearch: false});
		$routeProvider.when('/throttle', { templateUrl: 'samples/partials/throttle.html', controller: 'SampleController', reloadOnSearch: false});
        $routeProvider.otherwise({ redirectTo: '/debounce' });
    };

    sampleApp.config(['$routeProvider', config]);

})(window);
