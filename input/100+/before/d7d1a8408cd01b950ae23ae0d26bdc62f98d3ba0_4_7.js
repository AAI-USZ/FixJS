function(){
				$x.trigger(event);
				test.assertEquals(".wait() should have fired after triggering the event", 1, x);
				$x.trigger(event);
				test.assertEquals(".wait() should not fire anymore", 1, x);
				window.setTimeout(function(){
					$x.trigger(event);
					test.assertEquals(".wait() should not have fired anymore", 1, x);
					test.done();
				}, 100);
			}