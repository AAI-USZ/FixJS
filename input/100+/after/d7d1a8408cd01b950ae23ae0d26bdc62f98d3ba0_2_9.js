function(){
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
				}