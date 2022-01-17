function($, test) {
			var x = 0;
			var interval = 100;
			var $x = $('<div>');
			var callback = function(y){
				test.assertEquals("callback argument must be iteration number", x,y);
				x++; test.check();
				if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
			};
			var TIC = $x.repeat(interval,true,callback).until(1);
			test.assertEquals("instantly stopped interval-triggered loop should return original jQuery object", $x, TIC);
			test.assertEquals(".repeat(interval) should have been run once", 1, x);
			window.setTimeout(function(){
				test.assertEquals(".repeat(event) should not have been triggered again", 1, x);
				test.done();
			}, 2*interval);
		}