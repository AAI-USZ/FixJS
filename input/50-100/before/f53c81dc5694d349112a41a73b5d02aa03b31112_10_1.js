function(e) {
							var $button      = $(this),
								$curSlide   = $slides.eq( $button.index() ),
								$curContent = $contentContainer.children('.slide-content_' + $curSlide.index() );
								
							// stop autoplay
							if( settings.pause ) {
								$el.data('autoPlayStop', true);
								clearInterval( int );
							}
							
							// Make things happening
							swithSlide( $button, $curSlide, $curContent );
							
							e.preventDefault();
						}