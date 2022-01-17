function( $el, $slides, nmbSlides, slideWidth, $slideBg, $buttons, $content, $slideBgImage, $slideImagesContainer, $slidesContainer, $buttonsContainer, $contentContainer, $paginationContainer, $movingElem, settings ) {
				
				// move descriptions to new place
				$content.each(function(i) {
					var $el = $(this);
					$el.appendTo($contentContainer).addClass('slide-content_' + i);
				});
				
				// add position if needed class & fix position/height
				$contentContainer.addClass( settings.contentPosition ).css('height', $content.eq( settings.pos ).outerHeight() );
				
				// Fix pagination buttons
				$paginationContainer.addClass( settings.contentPosition );
				
				if( settings.contentPosition ) {
					
					$('a', $paginationContainer ).css( 'height', $contentContainer.outerHeight() );
					
				} else {
				
					var paginationButtonHeight = ( $contentContainer.outerHeight() - 1 ) / 2;
					
					$('a', $paginationContainer ).css('height', paginationButtonHeight);
				
					$('.next', $paginationContainer ).css('bottom', parseInt( $('.prev', $paginationContainer ).css('bottom') ) + paginationButtonHeight + 1 + 'px');

				}
				
				// Check for links
				$slides.each(function(i) {
					var $this = $(this),
						href  = $this.find('a').attr('href')
						mode  = $this.find('a').attr('class'),
						title = $this.find('a').attr('title');
						
					$this.add( $this.find( $slideBgImage ) ).data({
						'url'   : href,
						'mode'  : mode,
						'title' : title
					});
				});
				
				// set the slides 
				$slides.css({
					'display' : 'block',
					'height'  : settings.height - $buttons.outerHeight() + 'px'
				}).appendTo( $slidesContainer );
				
				// fix dimensions
				$slidesContainer.css({
					'max-height' : settings.height - $buttons.outerHeight() + 'px',
					'overflow'   : 'hidden',
					'width'      : '100%'
				});
								
				// set the width of the slideBgs
				$slideBg.css('width', slideWidth + 'px');
				
				// set the width of the buttons				
				$buttons.css('width', 100 / nmbSlides + '%');
				
				// move buttons	
				$buttons.appendTo( $buttonsContainer );
				
				// set the correct width of the buttons
				if( $el.width() / 2 === 748 / 2 ) {
				
					globalFunctions.buttonWidthLowRes( $buttons, $el );
				
				} else {
				
					globalFunctions.buttonWidthHighRes( $buttons, slideWidth );
				
				}
				
				// move slide-bg-images
				$slides.find( $slideBgImage ).appendTo( $slideImagesContainer );
				$slides.find('a').remove();
				
				// Give correct height
				$slideImagesContainer.css('max-height', settings.height - $buttons.outerHeight() + 'px');
				
				// set the width, height and background image of the main container
				$el.css({
					'max-height' : settings.height - $buttons.outerHeight() + ( $buttons.outerHeight() * Math.ceil( nmbSlides / 2 ) ) + 'px',
					'max-width'  : slideWidth * nmbSlides + 'px'
				});
				
				// if defaultBg is passed then defaultBg is set as background
				aux.setSlideBackground( settings.posBgImage, $slides, slideWidth );
				
				if( $(window).width() < 960 )
					$slideBgImage.eq( settings.pos ).stop(true, true).fadeIn( settings.type.speed, settings.type.easing ).css('display', 'block');
				
				// Change cursor if needed (has link)
				var slidesHref = $slides.eq( $el.find('.slide-button.active').index() ).data('url');
				$slides.css('cursor', 'auto');
				if( slidesHref ) $slides.css('cursor', 'pointer');
				
				var imgHref = $slideBgImage.eq( $el.find('.slide-button.active').index() ).data('url');
				$slideBgImage.css('cursor', 'auto');
				if( imgHref ) $slideBgImage.eq( $el.find('.slide-button.active').index() ).css('cursor', 'pointer');
				
				// When everything is done
				$(window).load(function() {
					
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
				
				});
			}