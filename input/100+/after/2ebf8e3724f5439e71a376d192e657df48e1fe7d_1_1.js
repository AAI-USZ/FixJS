function init() {
					
					helpers.autoSlidePause(sliderNumber);
					
					$(stageNode).css('width', '');
					$(stageNode).css('height', '');
					$(slideNodes).css('width', '');
					
					sliderMax = 0;
					childrenOffsets = new Array();
					containerWidth = $(stageNode).parent().width();
					stageWidth = $(stageNode).outerWidth(true);
					
					if(settings.responsiveSlideContainer) {
						stageWidth = ($(stageNode).outerWidth(true) > containerWidth) ? containerWidth : $(stageNode).outerWidth(true);
					}
					
					$(stageNode).css({
						position: 'relative',
						top: '0',
						left: '0',
						overflow: 'hidden',
						zIndex: 1,
						width: stageWidth
					});
					
					if(settings.responsiveSlides) {
						
						$(slideNodes).each(function(j) {
							
							var thisSlideWidth = $(this).outerWidth(true);

							if(thisSlideWidth > stageWidth) {
								
								thisSlideWidth = stageWidth + ($(this).outerWidth(true) - $(this).width()) * -1;
							
							} else {
								
								thisSlideWidth = $(this).width();
								
							}
							
							$(this).css({
								width: thisSlideWidth
							});
						
						});
					
					}
	
					$(scrollerNode).children().each(function(j) {
						
						$(this).css({
							'float': 'left'
						});
						
						childrenOffsets[j] = sliderMax * -1;
						
						sliderMax = sliderMax + $(this).outerWidth(true);
						
					});
					
					for(var i = 0; i < childrenOffsets.length; i++) {
						
						if(childrenOffsets[i] <= ((sliderMax - stageWidth) * -1)) {
							break;
						}
						
						lastChildOffset = i;
						
					}
					
					childrenOffsets.splice(lastChildOffset + 1, childrenOffsets.length);
		
					childrenOffsets[childrenOffsets.length] = (sliderMax - stageWidth) * -1;
					
					sliderMax = sliderMax - stageWidth;
					
					$(scrollerNode).css({
						'webkitPerspective': 1000,
						'webkitBackfaceVisibility': 'hidden',
						position: 'relative',
						cursor: grabOutCursor,
						width: sliderMax + stageWidth + 'px',
						overflow: 'hidden'
					});
					
					containerHeight = $(stageNode).parent().height();
					stageHeight = $(stageNode).height();
					
					if(settings.responsiveSlideContainer) {
						stageHeight = ($(stageNode).height() > containerHeight) ? containerHeight : $(stageNode).height();
					}
					
					$(stageNode).css({
						height: stageHeight
					});
					
					helpers.setSliderOffset(scrollerNode, childrenOffsets[activeChildOffsets[sliderNumber]]);
					
					if(sliderMax <= 0) {
						
						$(scrollerNode).css({
							cursor: 'default'
						});
						
						return false;
					}
					
					if(!isTouch && !settings.desktopClickDrag) {
						
						$(scrollerNode).css({
							cursor: 'default'
						});
						
					}
					
					if(settings.scrollbar) {
						
						$('.' + scrollbarBlockClass).css({ 
							margin: settings.scrollbarMargin,
							overflow: 'hidden',
							display: 'none'
						});
						
						$('.' + scrollbarBlockClass + ' .' + scrollbarClass).css({ 
							border: settings.scrollbarBorder
						});
						
						scrollMargin = parseInt($('.' + scrollbarBlockClass).css('marginLeft')) + parseInt($('.' + scrollbarBlockClass).css('marginRight'));
						scrollBorder = parseInt($('.' + scrollbarBlockClass + ' .' + scrollbarClass).css('borderLeftWidth'), 10) + parseInt($('.' + scrollbarBlockClass + ' .' + scrollbarClass).css('borderRightWidth'), 10);
						scrollbarStageWidth = (settings.scrollbarContainer != '') ? $(settings.scrollbarContainer).width() : stageWidth;
						scrollbarWidth = (scrollbarStageWidth - scrollMargin) / numberOfSlides;
		
						if(!settings.scrollbarHide) {
							scrollbarStartOpacity = settings.scrollbarOpacity;
						}
						
						$('.' + scrollbarBlockClass).css({ 
							position: 'absolute',
							left: 0,
							width: scrollbarStageWidth - scrollMargin + 'px',
							margin: settings.scrollbarMargin
						});
						
						if(settings.scrollbarLocation == 'top') {
							$('.' + scrollbarBlockClass).css('top', '0');
						} else {
							$('.' + scrollbarBlockClass).css('bottom', '0');
						}
						
						$('.' + scrollbarBlockClass + ' .' + scrollbarClass).css({ 
							borderRadius: settings.scrollbarBorderRadius,
							background: settings.scrollbarBackground,
							height: settings.scrollbarHeight,
							width: scrollbarWidth - scrollBorder + 'px',
							minWidth: settings.scrollbarHeight,
							border: settings.scrollbarBorder,
							'webkitPerspective': 1000,
							'webkitBackfaceVisibility': 'hidden',
							'webkitTransform': 'translateX(' + Math.floor((childrenOffsets[activeChildOffsets[sliderNumber]] * -1) / (sliderMax) * (scrollbarStageWidth - scrollMargin - scrollbarWidth)) + 'px)',
							opacity: scrollbarStartOpacity,
							filter: 'alpha(opacity:' + (scrollbarStartOpacity * 100) + ')',
							boxShadow: settings.scrollbarShadow
						});
		
						$('.' + scrollbarBlockClass).css({
							display: 'block'
						});
						
						if(!isTouch) {	
							$('.' + scrollbarClass).css({
								position: 'relative',
								left: Math.floor((childrenOffsets[activeChildOffsets[sliderNumber]] * -1) / (sliderMax) * (scrollbarStageWidth - scrollMargin - scrollbarWidth))
							});
						}
						
					}
					
					if(settings.infiniteSlider) {
					
						infiniteSliderWidth = (sliderMax + stageWidth) / 3;
						
					}
					
					if(settings.navSlideSelector != '') {
								
						$(settings.navSlideSelector).each(function(j) {
							
							$(this).css({
								cursor: 'pointer'
							});
							
							$(this).unbind('click.iosSliderEvent').bind('click.iosSliderEvent', function() {
								
								var goToSlide = j;
								if(settings.infiniteSlider) {
									goToSlide = j + infiniteSliderOffset;
								}
								
								helpers.changeSlide(goToSlide, scrollerNode, scrollTimeouts, sliderMax, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, childrenOffsets, sliderNumber, infiniteSliderOffset, infiniteSliderWidth, numberOfSlides, settings);
							});
						
						});
								
					}	
					
					if(settings.navPrevSelector != '') {
						
						$(settings.navPrevSelector).css({
							cursor: 'pointer'
						});
						
						$(settings.navPrevSelector).unbind('click.iosSliderEvent').bind('click.iosSliderEvent', function() {					
							if((activeChildOffsets[sliderNumber] > 0) || settings.infiniteSlider) {
								helpers.changeSlide(activeChildOffsets[sliderNumber] - 1, scrollerNode, scrollTimeouts, sliderMax, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, childrenOffsets, sliderNumber, infiniteSliderOffset, infiniteSliderWidth, numberOfSlides, settings);
							} 
						});
					
					}
					
					if(settings.navNextSelector != '') {
						
						$(settings.navNextSelector).css({
							cursor: 'pointer'
						});
						
						$(settings.navNextSelector).unbind('click.iosSliderEvent').bind('click.iosSliderEvent', function() {
							if((activeChildOffsets[sliderNumber] < childrenOffsets.length-1) || settings.infiniteSlider) {
								helpers.changeSlide(activeChildOffsets[sliderNumber] + 1, scrollerNode, scrollTimeouts, sliderMax, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, childrenOffsets, sliderNumber, infiniteSliderOffset, infiniteSliderWidth, numberOfSlides, settings);
							}
						});
					
					}
					
					if(settings.autoSlide) {
						
						if(settings.autoSlideToggleSelector != '') {
						
							$(settings.autoSlideToggleSelector).css({
								cursor: 'pointer'
							});
							
							$(settings.autoSlideToggleSelector).unbind('click.iosSliderEvent').bind('click.iosSliderEvent', function() {
								
								if(!isAutoSlideToggleOn) {
								
									helpers.autoSlidePause(sliderNumber);
									isAutoSlideToggleOn = true;
									
									$(settings.autoSlideToggleSelector).addClass('on');
									
								} else {
									
									helpers.autoSlide(scrollerNode, scrollTimeouts, sliderMax, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, childrenOffsets, sliderNumber, infiniteSliderOffset, infiniteSliderWidth, numberOfSlides, settings);
									
									isAutoSlideToggleOn = false;
									
									$(settings.autoSlideToggleSelector).removeClass('on');
									
								}
							
							});
						
						}
						
						if(!isAutoSlideToggleOn) {
							helpers.autoSlide(scrollerNode, scrollTimeouts, sliderMax, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, childrenOffsets, sliderNumber, infiniteSliderOffset, infiniteSliderWidth, numberOfSlides, settings);
						}
	
						if(!isTouch) {
							
							$(stageNode).bind('mouseenter.iosSliderEvent', function() {
								helpers.autoSlidePause(sliderNumber);
							});
							
							$(stageNode).bind('mouseleave.iosSliderEvent', function() {
								if(!isAutoSlideToggleOn) {
									helpers.autoSlide(scrollerNode, scrollTimeouts, sliderMax, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, childrenOffsets, sliderNumber, infiniteSliderOffset, infiniteSliderWidth, numberOfSlides, settings);
								}
							});
						
						} else {
							
							$(stageNode).bind('touchend.iosSliderEvent', function() {
							
								if(!isAutoSlideToggleOn) {
									helpers.autoSlide(scrollerNode, scrollTimeouts, sliderMax, scrollbarClass, scrollbarWidth, stageWidth, scrollbarStageWidth, scrollMargin, scrollBorder, childrenOffsets, sliderNumber, infiniteSliderOffset, infiniteSliderWidth, numberOfSlides, settings);
								}
							
							});
						
						}
					
					}
					
					$(stageNode).data('iosslider', {
						obj: $this,
						settings: settings,
						scrollerNode: scrollerNode,
						numberOfSlides: numberOfSlides,
						sliderNumber: sliderNumber,
						childrenOffsets: childrenOffsets,
						sliderMax: sliderMax,
						scrollbarClass: scrollbarClass,
						scrollbarWidth: scrollbarWidth, 
						scrollbarStageWidth: scrollbarStageWidth,
						stageWidth: stageWidth, 
						scrollMargin: scrollMargin, 
						scrollBorder: scrollBorder, 
						infiniteSliderOffset: infiniteSliderOffset, 
						infiniteSliderWidth: infiniteSliderWidth
					});
					
					isFirstInit = false;
					
					return true;
				
				}