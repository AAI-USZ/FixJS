function($, test) {
			var event = 'myEvent';
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = $('<div>');
			var TIC = $x.wait(event);
			test.assertEquals(".wait() should defer", 0, x);
			window.setTimeout(function(){
				$x.trigger(event);
				test.assertEquals(".wait() should have not fired before TIC knows to do so", 0, x);
				var $y = TIC.then(callback);
				test.assertEquals(".wait() should have fired after telling TIC", 1, x);
				test.assertNotEquals("instant .then() should not return TIC object", TIC, $y);
				test.assertEquals("instant .then() should return jQuery object", 1, $y.size());
				$x.trigger(event);
				test.assertEquals(".wait() should not fire anymore", 1, x);
				window.setTimeout(function(){
					$x.trigger(event);
					test.assertEquals(".wait() should not have fired anymore", 1, x);
					test.done();
				}, 100);
			}, 100);
		}