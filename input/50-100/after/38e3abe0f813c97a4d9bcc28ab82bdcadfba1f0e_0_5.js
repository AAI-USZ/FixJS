function() {
						if (op.numberSimultaneousSlides > 1) {
							var nextDestination = $(destination).next(),
								i=1;
							while (i<op.numberSimultaneousSlides) {
								nextDestination.addClass(op.classesActive);
								nextDestination = nextDestination.next();
								i += 1;
							}
						}

						$(destination).addClass(op.classesActive).add($(destination).siblings(op.slidesBoxSlideActive)).fadeIn(op.effectTime);
					}