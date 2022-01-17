function(){
							test.assertEquals(".repeat(event) should have been triggered again", 2, x);
							$x.unrepeat();
							window.setTimeout(function(){
								test.assertEquals(".repeat(event) should not fire anymore", 2, x);
								test.done();
							}, 2*interval);
						}