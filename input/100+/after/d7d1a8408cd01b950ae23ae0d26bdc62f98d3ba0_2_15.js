function(){
					test.assertEquals(".repeat(event) should still wait for interval", 0, x);
					window.setTimeout(function(){
						test.assertEquals(".repeat(event) should have been triggered", 1, x);
						window.setTimeout(function(){
							test.assertEquals(".repeat(event) should not have been triggered again", 2, x);
							window.setTimeout(function(){
								test.assertEquals(".repeat(event) should not fire anymore", 2, x);
								TIC.then(function(){
									test.done();
								});
							}, 2*interval);
						}, interval);
					}, interval);
				}