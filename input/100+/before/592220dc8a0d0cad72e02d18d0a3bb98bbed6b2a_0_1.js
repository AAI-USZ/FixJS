function() {
					slide = slide.prev();
					$(window)._scrollable().stop();
					$.scrollTo(slide, {
						duration: o.duration,
						easing: o.easing
					});
					
					return false;
				}