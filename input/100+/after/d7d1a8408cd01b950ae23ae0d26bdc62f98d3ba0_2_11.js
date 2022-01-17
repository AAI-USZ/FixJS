function($, test) {
				var x = 0;
				var count = 10;
				var interval = 100;
				var $x = $('<div>');
				var callback = function(y){
					test.assertEquals("callback argument must be iteration number", x,y);
					x++; test.check();
					if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
				};
				var TIC = $x.repeat(interval,callback);
				test.assertNotEquals("interval-triggered loop should not return original jQuery object", $x, TIC);
				test.assertEquals(".repeat(interval) should wait for interval", 0, x);
				window.setTimeout(function(){
					test.assertEquals(".repeat(event) should still wait for interval", 0, x);
					window.setTimeout(function(){
						test.assertEquals(".repeat(event) should have been triggered", 1, x);
						window.setTimeout(function(){
							test.assertEquals(".repeat(event) should have been triggered again", 2, x);
							$x.unrepeat();
							window.setTimeout(function(){
								test.assertEquals(".repeat(event) should not fire anymore", 2, x);
								test.done();
							}, 2*interval);
						}, interval);
					}, interval);
				}, interval / 2);			
			}