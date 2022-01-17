function(run) {
			var seconds = run.duration;
			if (run.duration < 60 * 60) {
				var minutes = Math.floor(seconds/60);
				seconds -= minutes*60;
				run.time = pad(minutes)+':'+pad(seconds);
			} else {
				var hours = Math.floor(seconds/3600);
				seconds -= hours*3600;
				var minutes = Math.floor(seconds/60);
				seconds -= minutes*60;
				run.time = pad(hours)+':'+pad(minutes)+':'+pad(seconds);
			}
		}