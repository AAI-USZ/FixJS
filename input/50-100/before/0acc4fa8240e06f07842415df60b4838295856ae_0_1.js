function(e){

					e.preventDefault();

					touch = e.originalEvent.touches[0] ||
							e.originalEvent.changedTouches[0];

					if (touch.pageX - startX > 10) {
						slider.off('touchmove.touchtouch');
						slider.trigger('prev.touchtouch');
						//showPrevious();
					} else if (touch.pageX - startX < -10) {
						slider.off('touchmove.touchtouch');
						slider.trigger('next.touchtouch');
						//showNext();
					}
				}