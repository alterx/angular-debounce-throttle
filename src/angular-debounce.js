/*! angular-debounce v0.0.0 - MIT license */

/* global angular */
;(function (window) {
    'use strict';
	
	var debounceModule = window.debounceModule = angular.module('debounceModule', []);
 
    function $debounce($rootScope, $timeout, $q, $exceptionHandler) {
		var deferreds = {},
                methods = {},
                uuid = 0;
 
		function debounce(fn, delay, invokeApply, leading, params) {
			var deferred = $q.defer(),
				promise = deferred.promise,
				skipApply = (angular.isDefined(invokeApply) && !invokeApply),
				intentPromise, 
				cleanup,
				methodId, 
				bouncing = false;
			
			var debounced = function() {
				if(deferreds[methods[methodId].timeoutId] && leading){
					deferreds[methods[methodId].timeoutId].reject('canceled');
				}
				delete methods[methodId];
				
				// If we are debouncing and executing at the end, resolve the promise here
				if(!leading){
					resolvePromise();
				}
 
				if (!skipApply){
					$rootScope.$apply();
				}
			};
				
			var resolvePromise = function() {
				try {
					deferred.resolve(fn.apply(this, params));
				} catch(e) {
					deferred.reject(e);
					$exceptionHandler(e);
				}
			};
 
			// Check we dont have this method already registered
			angular.forEach(methods, function(value, key) {
				if(angular.equals(methods[key].fn, fn)) {
					bouncing = true;
					methodId = key;
				}
			});
 
			if(!bouncing) {
				// Not bouncing, then register new instance
				methodId = uuid++;
				methods[methodId] = {fn: fn};
				// If we are debouncing and executing inmediately, resolve the promise here
				if(leading){
					resolvePromise();
				}
			} else {
				// Clear the old timeout
				if(deferreds[methods[methodId].timeoutId]){
					deferreds[methods[methodId].timeoutId].reject('bounced');
				}
				
				$timeout.cancel(methods[methodId].intentPromise);
			}
 
			intentPromise = $timeout(debounced, delay);
 
			// track id with method, we need this to clean it up later
			methods[methodId].intentPromise = intentPromise;
 
			// clean up the stored deferred when the promise is resolved or rejected
			cleanup = function() {
				delete deferreds[promise.$$timeoutId];
			};
 
			promise.$$timeoutId = intentPromise.$$timeoutId;
			deferreds[intentPromise.$$timeoutId] = deferred;
			promise.then(cleanup, cleanup);
 
			return promise;
		}
 
		// Similar to angular's $timeout cancel
		debounce.cancel = function(promise) {
			if (promise && promise.$$timeoutId in deferreds) {
				deferreds[promise.$$timeoutId].reject('canceled');
				return $timeout.cancel(promise);
			}
			return false;
		};
 
		return debounce;
    }

    debounceModule.factory('$debounce', ['$rootScope', '$timeout', '$q', '$exceptionHandler', $debounce]);
 
})(window);