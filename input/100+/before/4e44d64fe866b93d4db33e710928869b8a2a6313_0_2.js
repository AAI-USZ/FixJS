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
				
				fn.goToNextAndPrevious (slideControlsBox, interval, slideControls);
				
				slideControls.fixed.find('a, [role="link"]').on('click',function (event) {
					event.preventDefault();
					var newSelectedInFixed = $(this).closest(op.slidesBoxControlsFixed),
						selectedInFixed = newSelectedInFixed.siblings(op.slidesBoxSlideActive);
					fn.pauseSlide(interval, slideControls);
					fn.goToSlide($(this), $(this).attr('data-slice-slide-destination'), slideControlsBox, newSelectedInFixed, selectedInFixed);
				});
				
				slideControls.pauseResume.bind('click',function (event) {
					event.preventDefault();
					if (slideControls.pauseResume.find('[data-slice-slide-playing]').length > 0) {
						fn.pauseSlide(interval, slideControls);
					} else {
						slideControls.pauseResume.html(fn.tmpl(op.templateControlsPlaying, {text: fn.culture}));
						fn.resumeSlide(slidesBox, slideControls);
					}
				});
			}