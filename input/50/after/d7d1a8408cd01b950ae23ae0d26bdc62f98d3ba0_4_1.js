function(){
					test.assertEquals(".wait() should have been interrupted by .unwait()", 0, x);
					window.setTimeout(function(){
						test.assertEquals(".wait() should not fire anymore", 0, x);
						test.done();
					}, 100);
				}