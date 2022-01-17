function (interval, slideControls) {
				clearInterval(interval);
				slideControls.pauseResume.html(fn.tmpl('#slice-slide-controls-paused'));
			}