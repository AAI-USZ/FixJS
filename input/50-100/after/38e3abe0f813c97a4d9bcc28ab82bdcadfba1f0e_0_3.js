function (slidesBox, slides, idSlideBox) {
				var pagesNumber = Math.ceil(slides.length / op.numberSimultaneousSlides);
				slidesBox.append(fn.tmpl(op.templatesControls, {id: idSlideBox, slides: slides, pagesNumber: pagesNumber, numberSimultaneousSlides: op.numberSimultaneousSlides, text: fn.culture}));
				fn.startSlide(slidesBox);
			}