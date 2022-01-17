function() {
								
								var goToSlide = j;
								if(settings.infiniteSlider) {
									goToSlide = j + infiniteSliderOffset;
								}
								
								activeChildOffsets[sliderNumber] = helpers.changeSlide(goToSlide, scrollerNode, scrollTimeouts, sliderMax, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, childrenOffsets, sliderNumber, infiniteSliderOffset, infiniteSliderWidth, numberOfSlides, settings);
							}