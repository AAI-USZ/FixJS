function(){

			$('#score-time-count').text(this.zeroPad(0, 3));
			clearInterval(timer);
			var ms = this;
			timer = window.setInterval(function(){

				ms.timeElapsed++;
				$('#score-time-count').text(ms.zeroPad(ms.timeElapsed, 3));
				


			}, 1000);


		}