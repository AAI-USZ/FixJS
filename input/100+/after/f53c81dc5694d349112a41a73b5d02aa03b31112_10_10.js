function(e) {

							mouseOver = false;
						
							if( $(window).width() < 960 ) {
						
								var $slide = $slideBgImage.eq( $el.find('.slide-button.active').index() );
								
							} else {
							
								var $slide = $slides.eq( $el.find('.slide-button.active').index() );
								
							}
							
							var href       = $slide.data('url'),
								mode       = $slide.data('mode'),
								title      = $slide.data('title'),
								isFancybox = mode ? mode.match(/(iframe|single-image|image-gallery)/g) : -1,
								showButtons, width, height, maxWidth, maxHeight, fitToView, autoSize, closeClick;
								
							if( typeof href !== 'undefined' && href ) {
								
								// Check if Fancybox mode
								if( isFancybox !== -1 && isFancybox !== null ) {
									
									// Set correct settings
									if( isFancybox[0] === 'iframe' ) {
									
										mode        = 'iframe';
										showButtons = false;
										width       = '70%';
										height      = '70%';
										maxWidth    = 800;
										maxHeight   = 600;
										fitToView   = false;
										autoSize    = false;
										closeClick  = false;
										
									} else {
																	
										mode        = 'image';
										showButtons = {};
										width       = 800;
										height      = 600;
										maxWidth    = 9999;
										maxHeight   = 9999;
										fitToView   = true;
										autoSize    = true;
										closeClick  = false;
									
									}
									
									$.fancybox({
										type        : mode,
										href        : href,
										title       : title,
										openEffect  : 'fade',
										closeEffect	: 'fade',
										nextEffect  : 'fade',
										prevEffect  : 'fade',
										helpers     : {
											title   : {
												type : 'inside'
											},
											buttons  : showButtons
										},
										width       : width,
										height      : height,
										maxWidth    : maxWidth,
										maxHeight   : maxHeight,
										fitToView   : fitToView,
										autoSize    : autoSize,
										closeClick  : closeClick,
										beforeShow  : function() {
											if( $el.data('autoPlayStop') || settings.timeout === 0 || settings.pause )
												$el.data('sliderStopped', true);
												
											$el.data({
												'autoPlayStop' : true,
												'anim'         : false
											});
										},
										afterClose  : function() {
											if( !$el.data('sliderStopped') )
												$el.removeData('autoPlayStop');
											if( !$el.data('autoPlayStop') && settings.timeout > 0 && mouseOver !== true )
												autoplayInt = setTimeout( autoPlay, settings.timeout );
										}
									});
									
								} else {
								
									// If normal url was found, let's redirect then
									window.location = href;
									
								}
								
							}							
							
							e.preventDefault();
							
						}