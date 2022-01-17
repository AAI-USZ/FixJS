function(e) {
						
							if( $(window).width() < settings.width ) {
						
								var $slide = $slideBgImage.eq( $el.find('.slide-button.active').index() );
								
							} else {
							
								var $slide = $slides.eq( $el.find('.slide-button.active').index() );
								
							}
							
							var href       = $slide.data('url'),
								mode       = $slide.data('mode'),
								title      = $slide.data('title'),
								isFancybox = mode ? mode.match(/(iframe|single-image|image-gallery)/g) : -1,
								showTitle;
								
							if( typeof href !== 'undefined' && href ) {
								
								// Check if Fancybox mode
								if( isFancybox !== -1 && isFancybox !== null ) {
									
									// Set correct settings
									mode      = isFancybox[0] === 'iframe' ? 'iframe' : 'image';
									showTitle = mode          === 'iframe' ? false    : true;
									
									$.fancybox({
										'type'          : mode,
										'href'          : href,
										'title'         : title,
										'transitionIn'  : 'fade',
										'transitionOut' : 'fade',
										'titlePosition' : 'over',
										'titleShow'     : showTitle
									});
								
								} else {
								
									// If normal url was found, let's redirect then
									window.location = href;
									
								}
								
							}							
							
							e.preventDefault();
							
						}