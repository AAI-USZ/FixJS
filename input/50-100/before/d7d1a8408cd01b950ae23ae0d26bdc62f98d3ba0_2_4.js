function(y){
				test.assertEquals("callback argument must be iteration number", x,y);
				x++; test.check();
				if (x > 1000) { $x.unrepeat(); throw "repeat loop running infinitely"; };
			}