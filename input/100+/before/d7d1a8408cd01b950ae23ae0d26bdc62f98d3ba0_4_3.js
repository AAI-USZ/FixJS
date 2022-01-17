function($, test) {
			var timeout = 100;
			var x = 0;
			var callback = function(){ x++; test.check(); };
			var $x = $('<div>');
			$x.wait(timeout, callback);
			test.assertEquals(".wait() should defer", 0, x);
			$x.unwait();
			window.setTimeout(function(){
				test.assertEquals(".wait() should have been interrupted by .unwait()", 0, x);
				window.setTimeout(function(){
					test.assertEquals(".wait() should not fire anymore", 0, x);
					test.done();
				}, timeout+1);
			}, timeout+1);
		}