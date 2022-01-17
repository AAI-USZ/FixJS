function($, test) {
			var timeout = 100;
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = $('<div>');
			$x.wait(timeout, callback);
			test.assertEquals(".wait() should defer", 0, x);
			$x.unrepeat();
			window.setTimeout(function(){
				test.assertEquals(".wait() should not have been interrupted by .unrepeat()", 1, x);
				test.done();
				window.setTimeout(function(){
					test.assertEquals(".wait() should not fire anymore", 1, x);
					test.done();
				}, timeout+1);
			}, timeout+1);
		}