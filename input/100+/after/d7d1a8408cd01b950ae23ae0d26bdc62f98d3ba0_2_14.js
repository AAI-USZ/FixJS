function(){
						test.assertEquals(".repeat(event) should have been triggered", 2, x);
						window.setTimeout(function(){
							test.assertEquals(".repeat(event) should have been triggered again", 3, x);
							$x.unrepeat();
							window.setTimeout(function(){
								test.assertEquals(".repeat(event) should not fire anymore", 3, x);
								test.done();
							}, 2*interval);
						}, interval);
					}