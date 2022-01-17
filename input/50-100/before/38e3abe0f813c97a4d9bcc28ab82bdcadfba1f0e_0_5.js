function() {
						if (op.numberSimultaneousSlides > 1) {
							var nextDestination = $(destination).next();
							var i=1; while (i<op.numberSimultaneousSlides) {
								nextDestination.addClass(op.classesActive);
								var nextDestination = nextDestination.next();
								i++;
							}
						}

						$(destination).addClass(op.classesActive).add($(destination).siblings(op.slidesBoxSlideActive)).fadeIn(op.effectTime);
					}