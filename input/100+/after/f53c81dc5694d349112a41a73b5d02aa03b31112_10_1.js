function() {
					
					$el.addClass('fully-loaded');

					// display slides
					$slides.css( 'width', slideWidth + 'px' );
					
					// position it correctly and set the width of the hover block
					$movingElem.css({
						'bottom'     : $buttons.innerHeight() + parseInt( $buttons.css('border-bottom-width') ) + 'px',
						'left'       : slideWidth * settings.pos,
						'visibility' : 'visible',
						'width'      : slideWidth + 'px'
					});
					
					if( $(window).width() < 960 ) {
				
						// Fix the position
						if( settings.contentPosition === 'center' ) {
						
							var contentContainerOffset = ( $el.width() - $contentContainer.outerWidth() ) / 2 - $('a', $paginationContainer).outerWidth() - 1;
							
							$('.prev', $paginationContainer).css('left', contentContainerOffset );	
							
							$('.next', $paginationContainer).css('right', contentContainerOffset );	
							
						} else if( settings.contentPosition === 'bottom' ) {
						
							$contentContainer.add( $('a', $paginationContainer ) ).css('bottom', $el.outerHeight() - $slideImagesContainer.outerHeight() );
						
							$contentContainer.css('width', 
								$slideImagesContainer.outerWidth()
								- ( $('a', $paginationContainer).outerWidth() * 2 + 2 )
								- ( parseInt( $contentContainer.css('padding-left') )
								+ parseInt( $contentContainer.css('padding-right') ) )
							);
						
						} else {
				
							$contentContainer.add( $('.prev', $paginationContainer ) ).css('bottom', $el.outerHeight() - $slideImagesContainer.outerHeight() + 30 );
						
							$('.next', $paginationContainer ).css('bottom', $el.outerHeight() - $slideImagesContainer.outerHeight() + 30 + $('.next', $paginationContainer ).outerHeight() );
					
						}
						
					}
				
				}