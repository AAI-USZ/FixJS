function(){
					$x.trigger(event);
					test.assertEquals("callback should not have fired anymore", count+2, x);
					test.done();
				}