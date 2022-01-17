function(){
					$x.trigger(event);
					test.assertEquals("callback should not have fired anymore", count, x);
					test.done();
				}