function(){
					test.assertEquals(".repeat() should not fire again before timeout", 1, x);
					window.setTimeout(function(){
						test.assertEquals(".repeat() should have fired again after timeout", 2, x);
						$x.unrepeat();
						test.assertEquals(".unrepeat() should not fire anything", 2, x);
						window.setTimeout(function(){
							test.assertEquals(".repeat() should not have fired anymore", 2, x);
							$x.unrepeat();
							test.assertEquals(".repeat() should not have fired anymore after .unrepeat()", 2, x);
							test.done();
						}, timeout);
					}, timeout);
				}