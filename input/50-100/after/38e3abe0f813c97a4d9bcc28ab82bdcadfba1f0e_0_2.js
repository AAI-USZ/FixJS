function (slidesBox) {
				var allSlides = slidesBox.find(op.slidesBoxSlide),
					initialSlides = allSlides.filter(':lt(' + op.numberSimultaneousSlides + ')'),
					notInitialSlides = allSlides.filter(':gt(' + (op.numberSimultaneousSlides - 1) + ')');
				initialSlides.addClass(op.classesActive);
				notInitialSlides.hide();
			}