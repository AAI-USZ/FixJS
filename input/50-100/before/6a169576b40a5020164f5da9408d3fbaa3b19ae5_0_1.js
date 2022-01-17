function(){

			clearInterval(timer);
			var ms = this;
			timer = window.setInterval(function(){

				ms.timeElapsed++;
				$('#score-time-count').text(ms.zeroPad(ms.timeElapsed, 3));
				


			}, 1000);


		}