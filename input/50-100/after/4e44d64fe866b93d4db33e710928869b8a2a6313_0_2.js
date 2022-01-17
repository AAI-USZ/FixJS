function (event) {
						event.preventDefault();
						fn.pauseSlide(interval, slideControls);
						fn.changeSlide(slideControlsBox, -1);
					}