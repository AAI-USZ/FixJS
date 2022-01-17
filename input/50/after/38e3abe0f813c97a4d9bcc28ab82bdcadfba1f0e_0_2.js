function (interval, slideControls) {
				clearInterval(interval);
				slideControls.pauseResume.html(fn.tmpl(op.templateControlsPaused, {text: fn.culture}));
			}