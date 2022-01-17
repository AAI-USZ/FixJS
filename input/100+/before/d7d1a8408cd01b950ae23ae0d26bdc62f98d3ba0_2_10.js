function($, test) {
			var x = 0;
			var count = 10;
			var event = 'myEvent';
			var $x = $('<div>');
			var callback = function(y){
				test.assertEquals("callback argument must be iteration number", x,y);
				x++; test.check();
				if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
			}			
			var TIC = $x.repeat(event,true,callback);
			test.assertEquals(".repeat(event) should have been fired already", 1, x);
			for (var i=1; i<=count; i++) {
				$x.trigger(event);
				test.assertEquals(".repeat(event) should be fired only once for now because it is open", 1, x);
			}
			window.setTimeout(function(){
				test.assertEquals(".repeat(event) should now have been fired again", 2, x);
				for (var i=1; i<=count; i++) {
					$x.trigger(event);
					test.assertEquals(".repeat(event) should wait for event to be triggered", i+2, x);
				}
				$x.unrepeat();
				$x.trigger(event);
				test.assertEquals(".repeat(event) should not fire anymore", count+2, x);
				$x.trigger(event);
				window.setTimeout(function(){
					$x.trigger(event);
					test.assertEquals("callback should not have fired anymore", count+2, x);
					test.done();
				}, 100);
			}, 1);			
		}