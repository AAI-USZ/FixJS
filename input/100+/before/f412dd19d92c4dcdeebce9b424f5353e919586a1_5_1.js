function(startX,startY,endX,endY,duration) {
			var startTime = new Date(),
				timerId = window.setInterval(function() {
					var t = ((new Date()) - startTime) / duration;
					if(t >= 1) {
						window.clearInterval(timerId);
						t = 1;
					}
					t = slowInSlowOut(t);
					var x = startX + (endX - startX) * t,
						y = startY + (endY - startY) * t;
					window.scrollTo(x,y);
				}, 10);
		}