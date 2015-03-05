/* global sampleApp */

(function (/*window*/) {
    'use strict';

    var SampleController = function ($scope, $debounce, $throttle) {
		$scope.clicks = 0;
		$scope.clicks2 = 0;
		$scope.clicks3 = 0;
		var debounced1, debounced2, debounced3;
		
		$scope.onClick = function() {
            debounced1 = $debounce(increment, 3000, false);
        };
		
		$scope.onClickImmediate = function() {
            debounced2 = $debounce(immediateIncrement, 3000, false, true);
        };
		
		$scope.onClickImmediateThrottle = function() {
            debounced3 = $throttle(immediateIncrementThrottle, 3000, false, true, false);
        };
		
		$scope.clear = function() {
			$debounce.cancel(debounced1);
			$debounce.cancel(debounced2);
			$debounce.cancel(debounced3);
		};
		
		var increment = function() {
			$scope.clicks++;
		};
		
		var immediateIncrement = function() {
			$scope.clicks2++;
		};
		
		var immediateIncrementThrottle = function() {
			$scope.clicks3++;
		};

    };

    sampleApp.controller('SampleController', ['$scope', '$debounce', '$throttle', SampleController]);

})(window);
