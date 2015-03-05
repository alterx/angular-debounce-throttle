# angular-debounce-throttle

[![Build Status](https://secure.travis-ci.org/user/angular-debounce-throttle.png?branch=master)](http://travis-ci.org/user/angular-debounce-throttle)


## Installation

Install with [Bower](http://bower.io):

```
bower install --save angular-debounce-throttle
```


## API

### angular-debounce-throttle()

Add the dependencies to the main js file.

```
angular.module('sampleApp', ['ngRoute', 'debounceModule', 'throttleModule']);
```

and inject the required services:

```
sampleApp.controller('SampleController', ['$scope', '$debounce', '$throttle', SampleController]);
```


#### $debounce service

```
$scope.onClick = function() {
	$debounce(callback, 3000, false);
};
```

#### $throttle service

```
$scope.onClick = function() {
	$throttle(callback, 3000, false, true, false);
};
```

## Testing

Install [Node](http://nodejs.org) (comes with npm) and Bower.

From the repo root, install the project's development dependencies:

```
npm install
bower install
```

Testing relies on the Karma test-runner. If you'd like to use Karma to
automatically watch and re-run the test file during development, it's easiest
to globally install Karma and run it from the CLI.

```
npm install -g karma
karma start
```

To run the tests in Firefox, just once, as CI would:

```
npm test
```

## TODO

* Add jsdoc
* Add grunt

## Special Thanks 

http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
http://jsfiddle.net/6K7Kd/68/
http://underscorejs.org/docs/underscore.html#section-81
http://underscorejs.org/docs/underscore.html#section-82
