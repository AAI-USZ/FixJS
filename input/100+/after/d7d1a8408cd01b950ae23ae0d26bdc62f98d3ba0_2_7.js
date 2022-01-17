function($, test) {
				var x = 0;
				var count = 10;
				var $x = $('<div>');
				var callback = function(y){
					test.assertEquals("callback argument must be iteration number", x,y);
					x++; test.check();
					if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
				}
				var TIC = $x.repeat(callback).until(count);
				test.assertEquals(".repeat() should have fired exactly "+count+" times", count, x);
				test.assertEquals("instant for-loop should return original jQuery object", $x, TIC);
				window.setTimeout(function(){
					test.assertEquals(".repeat() should not have fired anymore", count, x);
					test.done();
				}, 100);
			}