function($, test) {
				var x = 0;
				var count = 10;
				var stopAfter = count/2;
				var $x = $('<div>');
				var callback = function(y){
					test.assertEquals("callback argument must be iteration number", x,y);
					x++; test.check();
					if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
				}
				var TIC = $x.repeat(callback).until(function(y){
					test.assertEquals("callback argument must be iteration number", x-1,y);
					return x >= stopAfter;
				});
				test.assertEquals("instant .repeat() should have fired exactly "+stopAfter+" times", stopAfter, x);
				test.assertEquals("instant for-loop should return original jQuery object", $x, TIC);
				window.setTimeout(function(){
					test.assertEquals(".repeat() should not have fired anymore", stopAfter, x);
					test.done();
				}, 100);
			}