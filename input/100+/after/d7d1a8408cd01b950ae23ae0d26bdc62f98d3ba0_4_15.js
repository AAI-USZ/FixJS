function($, test) {
				var event = 'myEvent';
				var x = 0;
				var callback = function(){ x++; test.check(); };
				var $x = $('<div>');
				var TIC = $x.wait(event);
				test.assertEquals(".wait() should defer", 0, x);
				$x.unwait();
				test.assertEquals(".wait() should not have fired before triggering the event", 0, x);
				$x.trigger(event);
				test.assertEquals(".wait() should have not fired before TIC knows to do so", 0, x);
				TIC.then(callback);
				test.assertEquals(".wait() should have not fired after telling TIC because of .unwait()", 0, x);
				$x.trigger(event);
				test.assertEquals(".wait() should not fire anymore", 0, x);
				window.setTimeout(function(){
					$x.trigger(event);
					test.assertEquals(".wait() should not have fired anymore", 0, x);
					test.done();
				}, 100);
			}