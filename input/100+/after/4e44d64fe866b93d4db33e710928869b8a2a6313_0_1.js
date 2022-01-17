function (index) {
					var slidesBox = $(this),
						slides = slidesBox.find(op.slidesBoxSlide),
						idSlideBox = fn.getSlidesBoxId(index);

					slidesBox.attr('id',idSlideBox);
					fn.setSlides(slidesBox,slides,idSlideBox); // Activate initial slides, and hide all other
					
					fn.controls(slidesBox,slides,idSlideBox); // Play-Pause and slide number controls
					
				}