function() {
					
					$el.addClass('fully-loaded');
																
					if( $(window).width() < settings.width ) {
								
						// set the correct width of the buttons		
						$buttons.css( 'max-width' , ( $el.outerWidth() - ( ( parseInt( $buttons.css('padding-left') ) + parseInt( $buttons.css('padding-right') ) ) * 2 ) ) / 2 + 'px' );
				
						// Fix the position
						if( settings.contentPosition === 'center' ) {
						
							var contentContainerOffset = $contentContainer.offset().left - $('a', $paginationContainer).outerWidth() - 1;
							
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