function (slidesBox,slides,idSlideBox) {
				slidesBox.append(fn.tmpl('#slice-slide-controls', {id: idSlideBox, slides: slides}));
				fn.startSlide(slidesBox);
			}