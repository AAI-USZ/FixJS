function(){
						test.assertEquals(".repeat() should not have fired because of .unrepeat()", 1, x);
						window.setTimeout(function(){
							test.assertEquals(".repeat() should not have fired anymore", 1, x);
							$x.unrepeat();
							test.assertEquals(".repeat() should not have fired anymore after .unrepeat()", 1, x);
							test.done();
						}, timeout);
					}