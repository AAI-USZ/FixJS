function() {
						
						// if options exist, lets merge them with our default settings
						if ( options ) {
							$.extend( settings, options );
						}
						
						// Cache some elements
						var $el            = $(this),
						
							$slides        = $el.find('.slide'),
							nmbSlides      = $slides.length,
							
							$slideBgImage  = $el.find('.slide-bg-image'),
							$buttons       = $el.find('.slide-button'),
							$content       = $el.find('.slide-content'),
							
							// For random effect
							animationModes = ['def', 'fade', 'seqFade', 'horizontalSlide', 'seqHorizontalSlide', 'verticalSlide', 'seqVerticalSlide', 'verticalSlideAlt', 'seqVerticalSlideAlt'],
							
							// width for each slide
							slideWidth     = Math.floor( settings.width / nmbSlides ),
							
							animTime, autoplayInt, mouseOver, compareWidth;
							
						// fix height setting (add button height to it)
						settings.height += $buttons.outerHeight();
						compareWidth = $el.width();
						
						// preload images
						aux.preloadImages( $slides, nmbSlides, $slideBgImage );
						
						// Check if need to show content only on hover
						if( settings.showContentOnhover ) $el.addClass('show-content-onhover');
						
						// Check if need to hide content
						if( settings.hideContent ) $el.addClass('hide-content');
						
						// Check if need to hide bottom navigation buttons
						if( settings.hideBottomButtons ) $el.addClass('hide-bottom-buttons');
						
						// The default slide
						var $defaultSlide   = $slides.eq( settings.pos );
						settings.posBgImage	= $defaultSlide.find( $slideBgImage ).attr('src');
						$defaultSlide.find('.slide-button').addClass('active');
						
						// prepend a bg image container for each one of the slides
						// this will have the right image as background
						// have a reference to those containers - $slideBg
						$slides.prepend('<div class="slide-img"></div>');
						var $slideBg = $el.find('.slide-img');
						
						// create slide images container
						$el.append('<div class="slide-images-container"></div>')
						var $slideImagesContainer = $('.slide-images-container');
						
						// create slides container
						$el.append('<div class="slides-container"></div>');
						var $slidesContainer = $('.slides-container');
						
						// create buttons container
						$el.append('<div class="buttons-container"></div>');
						var $buttonsContainer = $('.buttons-container');
						
						// create slide content container
						$el.append('<div class="content-container"></div>');
						var $contentContainer = $('.content-container');
						
						// create pagination
						$el.append('<div class="pagination-container"> <a class="prev">&laquo;</a> <a class="next">&raquo;</a> </div>');
						var $paginationContainer = $('.pagination-container');
						
						// create hover block
						$el.append('<div class="active-slide-bar">&nbsp;</div>');
						var $movingElem = $el.find('.active-slide-bar');
						
						// set this and that...
						aux.setup( $el, $slides, nmbSlides, slideWidth, $slideBg, $buttons, $content, $slideBgImage, $slideImagesContainer, $slidesContainer, $buttonsContainer, $contentContainer, $paginationContainer, $movingElem, settings );
						
						// show default slide content
						var $defContent	= $contentContainer.children('.slide-content_' + settings.pos);
						$defContent.fadeIn( settings.contentSpeed );
						
						// Check if effect should be random
						if( settings.type.mode === 'random' ) $el.data('randomEffect', true);

						// start autoplay after images are loaded
						$(window).load(function() {
							
							if( settings.timeout > 0 && mouseOver !== true )
								autoplayInt = setTimeout( autoPlay, settings.timeout );

						});
						
						// Autoplay
						function autoPlay(){
						
							var $curSlide = $slides.eq( $el.find('.slide-button.active').index() ).next();
							
							// If the last slide, start from beginning
							if( $el.find('.slide-button.active').index() === nmbSlides - 1 ) $curSlide = $slides.first();
								
							var $button      = $buttons.eq( $curSlide.index() ),
							    $curContent = $contentContainer.children('.slide-content_' + $curSlide.index() );
							
							// Make things happening
							swithSlide( $button, $curSlide, $curContent );
							
						}
						
						// The actual switching
						function swithSlide( $button, $curSlide, $curContent ) {
						
							// Clear timer
							clearTimeout( autoplayInt );
							autoplayInt = 0;
						
							clearTimeout( animTime );
							
							animTime = setTimeout(function() {
							
								if( $el.data( 'anim' ) )
									return false;
									
								$el.data( 'anim', true );
								
								if( settings.pos > -1 && !$button.hasClass('active') ) {
									// Move the hover block
									$movingElem.stop().animate({
										left : slideWidth * $curSlide.index()
									}, settings.type.speed * 1);
									
									$buttons.removeClass('active');
									$button.addClass('active');
									
									$content.stop(true, true).hide();
								}
								
								// Get random effect if necessary
								if( $el.data('randomEffect') ) settings.type.mode = animationModes[Math.floor( Math.random() * animationModes.length )];
								
								// If smaller screen,
								if( $(window).width() < 960 ) {
									// Animate slides in simplified way
									anim['responsiveDef'].slide( $el, $slides, nmbSlides, slideWidth, $slideBg, $button, $slideBgImage, $slideImagesContainer, $slidesContainer, settings );
								} else {
									// Animate slides in normal way
									anim[settings.type.mode].slide( $el, $slides, nmbSlides, slideWidth, $slideBg, $button, $slideImagesContainer, $slidesContainer, settings );
								}
								
								// Animate rest stuff
								$curContent.stop(true, true).fadeIn( settings.contentSpeed );
								
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

								// Start timer again
								if( !$el.data('autoPlayStop') && settings.timeout > 0 && mouseOver !== true )
									autoplayInt = setTimeout( autoPlay, settings.timeout );

							}, 100);
						
						}
						
						// click event on the buttons:
						$buttons.bind( 'click', function(e) {
						
							// stop autoplay
							if( settings.pause )
								$el.data('autoPlayStop', true);

							var $button      = $(this),
								$curSlide   = $slides.eq( $button.index() ),
								$curContent = $contentContainer.children('.slide-content_' + $curSlide.index() );
							
							// Make things happening
							swithSlide( $button, $curSlide, $curContent );
							
							e.preventDefault();
						});
						
						// click event on the pagination:
						$('a', $paginationContainer).bind( 'click', function(e) {

							// stop autoplay
							if( settings.pause )
								$el.data('autoPlayStop', true);
						
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

							// Make sure we aren't at the end yet
							if( ( $this.hasClass('next') && $curSlide.index() < nmbSlides ) || ( $this.hasClass('prev') && $curSlide.index() >= 0 ) ) {
							
								// Make things happening
								swithSlide( $button, $curSlide, $curContent );
								
							}
							
							e.preventDefault();
						});
						
						// Hover
						$el.on('mouseenter', function() {
							mouseOver = true;

							// Clear timer, if necessary
							if( settings.pauseOnHover ) {
								clearTimeout( autoplayInt );
								autoplayInt = 0;
							}
						}).on('mouseleave', function() {
							mouseOver = false;
						
							if( !$el.data('autoPlayStop') && settings.timeout > 0 )
								autoplayInt = setTimeout( autoPlay, settings.timeout );
						});
						
						// Image link
						$slidesContainer.add( $slideImagesContainer ).click(function(e) {

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
							
						});

						// Resize window (responsive)
						$(window).resize(function() {

							if( $el.width() !== compareWidth ) {
			
								// set the correct width of the buttons
								if( $el.width() / 2 === 748 / 2 ) {

									globalFunctions.buttonWidthLowRes( $buttons, $el );
									
									
								} else {

									globalFunctions.buttonWidthHighRes( $buttons, slideWidth );

								}
								
								if( $(window).width() < 960 ) {
									
									// Set content and pagination height
									var $curSlide              = $slideBgImage.eq( $el.find('.slide-button.active').index() ),
										$curContent            = $contentContainer.children('.slide-content_' + $curSlide.index() );
									
									if( settings.contentPosition ) {
									
										var paginationButtonHeight = ( $curContent.outerHeight() + parseInt( $contentContainer.css('padding-top') ) + parseInt( $contentContainer.css('padding-bottom') ) );
									
									} else {
									
										var paginationButtonHeight = ( $content.eq( $curSlide.index() ).outerHeight() + parseInt( $contentContainer.css('padding-top') ) + parseInt( $contentContainer.css('padding-bottom') ) - 1 ) / 2;
										
										$('.next', $paginationContainer).css('bottom', parseInt( $('.prev', $paginationContainer).css('bottom') ) + paginationButtonHeight + 1 + 'px');
										
									}
									
									$contentContainer.css('height', $curContent.outerHeight() );
									
									$('.next', $paginationContainer).css('bottom', parseInt( $('.prev', $paginationContainer).css('bottom') ) + paginationButtonHeight + 1 + 'px');
									$('a', $paginationContainer).css('height', paginationButtonHeight );
									
									if( $curSlide.is(':hidden') )
										$slideBgImage.hide();
										
									$curSlide.fadeIn().css('display', 'block');
									
									// "Fix" the position
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
									
										$contentContainer.add( $('.prev', $paginationContainer ) ).css('bottom', $el.outerHeight() - $slideImagesContainer.outerHeight() + 30);
									
										$('.next', $paginationContainer ).css('bottom', $el.outerHeight() - $slideImagesContainer.outerHeight() + 30 + $('.next', $paginationContainer ).outerHeight() );
								
									}
								
								} else {
								
									// Clear timer
									clearTimeout( autoplayInt );
									autoplayInt = 0;
										
									// stop autoplay
									if( settings.pause )
										$el.data('autoPlayStop', true);
											
									// Reset some inline CSS
									if( settings.contentPosition === 'center' ) {
										
										$('.prev', $paginationContainer ).css('left', '');
										
										$('.next', $paginationContainer ).css('right', '');
										
									} else if( settings.contentPosition === 'bottom' ) {
									
										$contentContainer.add( $('a', $paginationContainer ) ).css('bottom', '');
									
										$contentContainer.css('width', '');
									
									} else {
									
										$contentContainer.add( $('a', $paginationContainer ) ).css('bottom', '');
								
									}
								
									var $button     = $el.find('.slide-button.active'),
										$curSlide   = $slides.eq( $button.index() ),
										$curContent = $contentContainer.children('.slide-content_' + $curSlide.index() );
									
									// Make things happening
									swithSlide( $button, $curSlide, $curContent );
									
								}
								
								// Set new current width
								compareWidth = $el.width();
								
							}
							
						});
						
					}