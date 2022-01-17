function() {
								if( $el.data( 'anim' ) ) return false;
								$el.data( 'anim', true );
								
								if( settings.pos > -1 && !$button.hasClass('active') ) {
									// Move the hover block
									$movingElem.stop().animate({
										left : slideWidth * $curSlide.index()
									}, settings.type.speed * 1);
									
									$buttons.removeClass('active');
									$button.addClass('active');
									
									$content.stop().hide();
								}
								
								// Get random effect if necessary
								if( $el.data('randomEffect') ) settings.type.mode = animationModes[Math.floor( Math.random() * animationModes.length )];
								
								// If smaller screen,
								if( $(window).width() < settings.width ) {
									// Animate slides in simplified way
									anim['responsiveDef'].slide( $el, $slides, nmbSlides, slideWidth, $slideBg, $button, $slideBgImage, $slideImagesContainer, $slidesContainer, settings );
								} else {
									// Animate slides in normal way
									anim[settings.type.mode].slide( $el, $slides, nmbSlides, slideWidth, $slideBg, $button, $slideImagesContainer, $slidesContainer, settings );
								}
								
								// Animate rest stuff
								$curContent.stop().fadeIn( settings.contentSpeed );
								
								// "Fix" CSS
								$contentContainer.css('height', $curContent.outerHeight() );
								
								if( settings.contentPosition ) {
								
									var paginationButtonHeight = ( $curContent.outerHeight() + parseInt( $contentContainer.css('padding-top') ) + parseInt( $contentContainer.css('padding-bottom') ) );
								
								} else {
								
									var paginationButtonHeight = ( $content.eq( $curSlide.index() ).outerHeight() + parseInt( $contentContainer.css('padding-top') ) + parseInt( $contentContainer.css('padding-bottom') ) - 1 ) / 2;
									
									$('.next', $paginationContainer).css('bottom', parseInt( $('.prev', $paginationContainer).css('bottom') ) + paginationButtonHeight + 1 + 'px');
							
								}
										
								$('a', $paginationContainer).css('height', paginationButtonHeight );
						
								// Change cursor if needed
								var href = $slides.eq( $el.find('.slide-button.active').index() ).data('url');
								$slides.css('cursor', 'auto');
								if( href ) $slides.css('cursor', 'pointer');
									
							}