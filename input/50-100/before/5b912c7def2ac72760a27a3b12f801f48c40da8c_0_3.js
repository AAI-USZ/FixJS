function() {
							if((activeChildOffsets[sliderNumber] < childrenOffsets.length-1) || settings.infiniteSlider) {
								activeChildOffsets[sliderNumber] = helpers.changeSlide(activeChildOffsets[sliderNumber] + 1, scrollerNode, scrollTimeouts, sliderMax, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, childrenOffsets, sliderNumber, infiniteSliderOffset, infiniteSliderWidth, numberOfSlides, settings);
							}
						}