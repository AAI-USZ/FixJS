function (event) {
					event.preventDefault();
					if (slideControls.pauseResume.find('[data-slice-slide-playing]').length > 0) {
						fn.pauseSlide(interval, slideControls);
					} else {
						slideControls.pauseResume.html(fn.tmpl('#slice-slide-controls-playing'));
						fn.resumeSlide(slidesBox, slideControls);
					}
				}