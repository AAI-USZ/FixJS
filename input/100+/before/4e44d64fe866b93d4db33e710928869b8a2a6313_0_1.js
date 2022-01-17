function (index) {
					var slidesBox = $(this),
						slides = slidesBox.find(op.slidesBoxSlide),
						slidesCount = slides.length,
						numberId = index,
						idSlideBox = op.prefixId + (index+1);
					while ($('#' + idSlideBox).length) {
						index += 1;
						idSlideBox = op.prefixId + (index + 1);
					}

					slidesBox.attr('id',idSlideBox);
					fn.setSlides(slidesBox,slides,idSlideBox); // Activate initial slides, and hide all other
					
					fn.controls(slidesBox,slides,idSlideBox); // Play-Pause and slide number controls
					
				}