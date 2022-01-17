function (link, destination, slideControlsBox, newSelectedInFixed, selectedInFixed) {
				selectedInFixed.removeClass(op.classesActive);
				newSelectedInFixed.addClass(op.classesActive);
				
				var activeSlides = $(destination).siblings(op.slidesBoxSlideActive);
				
				if ($(destination).is(':hidden')) {
					activeSlides.removeClass(op.classesActive).fadeOut(op.effectTime, function() {
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
					});
				}
				
			}