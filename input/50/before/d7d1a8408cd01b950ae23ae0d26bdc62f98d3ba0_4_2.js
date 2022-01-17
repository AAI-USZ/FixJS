function(){
				test.assertEquals(".wait() should not have been interrupted by .unrepeat()", 1, x);
				window.setTimeout(function(){
					test.assertEquals(".wait() should not fire anymore", 1, x);
					test.done();
				}, 100);
			}