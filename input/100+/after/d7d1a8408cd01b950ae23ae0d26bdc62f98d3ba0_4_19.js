function($, test) {
				var event = 'myEvent';
				var x = 0;
				var callback = function(){ x++; test.check(); };
				var $x = $('<div>');
				$x.wait(event).then(callback);
				test.assertEquals(".wait() should defer", 0, x);
				$x.unrepeat();
				test.assertEquals(".wait() should not have fired before triggering the event", 0, x);
				$x.trigger(event);
				test.assertEquals(".wait() should not have been interrupted by .unrepeat()", 1, x);
				$x.trigger(event);
				test.assertEquals(".wait() should not fire anymore", 1, x);
				window.setTimeout(function(){
					$x.trigger(event);
					test.assertEquals(".wait() should not have fired anymore", 1, x);
					test.done();
				}, 100);
			}