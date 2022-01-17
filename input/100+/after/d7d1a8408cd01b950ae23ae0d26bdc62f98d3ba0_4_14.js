function(){
						$x.trigger(event);
						test.assertEquals(".wait() should not have fired anymore", 0, x);
						test.done();
					}