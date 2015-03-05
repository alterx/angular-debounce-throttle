/*! angular-throttle v0.0.0 - MIT license */

/* global angular */
;(function (window) {
    'use strict';
	
	var throttleModule = window.throttleModule = angular.module('throttleModule', []);
 
    function $throttle($rootScope, $timeout, $q, $exceptionHandler) {
		var deferreds = {},
                methods = {},
                uuid = 0;
 
		function throttle(fn, delay, invokeApply, leading, trailing, params) {
			var deferred = $q.defer(),
				promise = deferred.promise,
				skipApply = (angular.isDefined(invokeApply) && !invokeApply),
				delayedPromise, 
				cleanup,
				methodId, 
				throttling = false;

			var resolvePromise = function() {
				try {
					deferred.resolve(fn.apply(this, params));
				} catch(e) {
					deferred.reject(e);
					$exceptionHandler(e);
				}
			};
			
			var throttled = function() {
				if(deferreds[methods[methodId].timeoutId] && leading){
					deferreds[methods[methodId].timeoutId].reject('canceled');
				}
				delete methods[methodId];
				
				if(trailing) {
					resolvePromise();
				}
				
				if (!skipApply){
					$rootScope.$apply();
				}
			};
			
			// Check we dont have this method already registered
			angular.forEach(methods, function(value, key) {
				if(angular.equals(methods[key].fn, fn)) {
					throttling = true;
					methodId = key;
				}
			});
			
			if(!throttling){
				methodId = uuid++;
				methods[methodId] = {fn: fn};
				
				if(leading){
					fn.apply(this, params);
				}
				
				delayedPromise = $timeout(throttled, delay);
				methods[methodId].delayedPromise = delayedPromise;
				promise.$$timeoutId = delayedPromise.$$timeoutId;
				deferreds[delayedPromise.$$timeoutId] = deferred;
				
				cleanup = function() {
					delete deferreds[promise.$$timeoutId];
				};

				promise.then(cleanup, cleanup);
			} 

			return promise;
		}
 
		// Similar to angular's $timeout cancel
		throttle.cancel = function(promise) {
			if (promise && promise.$$timeoutId in deferreds) {
				deferreds[promise.$$timeoutId].reject('canceled');
				return $timeout.cancel(promise);
			}
			return false;
		};
 
		return throttle;
    }

    throttleModule.factory('$throttle', ['$rootScope', '$timeout', '$q', '$exceptionHandler', $throttle]);
 
})(window);