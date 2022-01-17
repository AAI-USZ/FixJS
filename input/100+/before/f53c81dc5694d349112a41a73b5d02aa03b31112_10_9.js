function(e) {
						
							var $this     = $(this),
								$curSlide = $slides.eq( $el.find('.slide-button.active').index() ),
								$button, $curContent;
						
							if( $this.hasClass('next') ) {
								$curSlide = $curSlide.next();
							} else if( $this.hasClass('prev') ) {
								$curSlide = $curSlide.prev();
							}
							
							// If the last slide, start from beginning
							if( $el.find('.slide-button.active').index() === nmbSlides - 1 && $this.hasClass('next') ) $curSlide = $slides.first();
							
							// If the first slide, start from end
							if( $curSlide.index() === -1 && $this.hasClass('prev') ) $curSlide = $slides.last();
							
							$button      = $buttons.eq( $curSlide.index() ),
							$curContent = $contentContainer.children('.slide-content_' + $curSlide.index() );
								
							// stop autoplay
							if( settings.pause ) {
								$el.data('autoPlayStop', true);
								clearInterval( int );
							}
							
							// Make sure we aren't at the end yet
							if( ( $this.hasClass('next') && $curSlide.index() < nmbSlides ) || ( $this.hasClass('prev') && $curSlide.index() >= 0 ) ) {
							
								// Make things happening
								swithSlide( $button, $curSlide, $curContent );
								
							}
							
							e.preventDefault();
						}