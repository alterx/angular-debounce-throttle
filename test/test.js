var expect = chai.expect;

describe('Tests', function () {
	
 	beforeEach(module('debounceModule'));
	beforeEach(module('throttleModule'));

    beforeEach(inject(function ($injector) {
    }));

    describe('$throttle', function(){



    });
	
	describe('$debounce', function(){

        it(': trailing', inject(function($debounce, $timeout) {		
			
			var count = 0;
			console.log('here');
			
			var increment = function() {
				count++;
				console.log('count');
			};			
			
			function callMe() {
				$debounce(increment, 3000, false);
			};
			
			callMe();
			expect(count).to.equal(0);
			
			for(var i = 0; i < 200;  i++) {
				callMe();
			}

        }));
		
		it(': leading', inject(function($debounce) {			
			
			var count = 0;
			
			var immediateIncrement = function() {
				count++;
				console.log(count);
			};			
			
			function callMe() {
				$debounce(immediateIncrement, 3000, false, true);
			};
			
			callMe();
			expect(count).to.equal(1);
			
			for(var i = 0; i < 200;  i++) {
				callMe();
			}
			
			expect(count).to.equal(1);
           	
        }));

    });
	  
});
