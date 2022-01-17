function (slidesBox) {
				var interval,
					slideControlsBox = slidesBox.find(op.slidesBoxControls).first(),
					slideControls = {
						fixed: fn.getControls(slideControlsBox, op.slidesBoxControlsFixed),
						previous: fn.getControls(slideControlsBox, op.slidesBoxControlsPrev),
						next: fn.getControls(slideControlsBox, op.slidesBoxControlsNext),
						pauseResume: fn.getControls(slideControlsBox, op.slidesBoxControlsPauseResume)
					},
					intervalTime = op.slideTime * 1000;
				
				interval = setInterval(function () {
					fn.changeSlide(slideControlsBox, 1);
				}, intervalTime);
				
				fn.eventControls.nextAndPrevious (slideControlsBox, interval, slideControls);
				fn.eventControls.fixed(slideControlsBox, interval, slideControls);
				fn.eventControls.pauseResume(slidesBox, interval, slideControls);
				
				
			}