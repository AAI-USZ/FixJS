function(){
						$x.trigger(event);
						test.assertEquals(".wait() should not have fired anymore", 1, x);
						test.done();
					}