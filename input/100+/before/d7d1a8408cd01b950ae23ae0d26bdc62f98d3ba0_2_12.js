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
			var TIC = $x.repeat(interval,true,callback);
			test.assertNotEquals("interval-triggered loop should not return original jQuery object", $x, TIC);
			test.assertEquals(".repeat(interval) should have been run already", 1, x);
			window.setTimeout(function(){
				test.assertEquals(".repeat(event) should wait for interval", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".repeat(event) should have been triggered", 2, x);
					window.setTimeout(function(){
						test.assertEquals(".repeat(event) should have been triggered again", 3, x);
						$x.unrepeat();
						window.setTimeout(function(){
							test.assertEquals(".repeat(event) should not fire anymore", 3, x);
							test.done();
						}, 2*interval);
					}, interval);
				}, interval);
			}, interval / 2);			
		}