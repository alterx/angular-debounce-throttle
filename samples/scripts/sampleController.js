/* global sampleApp */

(function (/*window*/) {
    'use strict';

    var SampleController = function ($scope, $debounce) {
		$scope.clicks = 0;
		
		$scope.onClick = function() {
            $debounce(increment, 10000);
        };
		
		var increment = function() {
			$scope.clicks++;
		};

    };

    sampleApp.controller('SampleController', ['$scope', '$debounce', SampleController]);

})(window);
