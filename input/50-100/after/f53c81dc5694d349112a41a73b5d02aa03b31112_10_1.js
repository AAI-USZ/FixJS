function(e) {
						
							// stop autoplay
							if( settings.pause )
								$el.data('autoPlayStop', true);

							var $button      = $(this),
								$curSlide   = $slides.eq( $button.index() ),
								$curContent = $contentContainer.children('.slide-content_' + $curSlide.index() );
							
							// Make things happening
							swithSlide( $button, $curSlide, $curContent );
							
							e.preventDefault();
						}