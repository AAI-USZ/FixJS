function( options ) {
				
				if( this.length ) {
					
					var settings = {
						// zero-based index of the first slide to be displayed
						pos             : 0,
						// slide container width
						width           : 940,
						// slide container height
						height          : 380,
						// speed of the transition
						contentSpeed    : 450,
						// options: default (empty) | center | bottom
						contentPosition : '',
						// show content only on mouseover
						hideContent     : false,
						// time between slide transitions (0 to disable autoplay)
						timeout         : 3000,
						// stop autoplay on click
						pause           : true,
						// pause autoplay on mouseover
						pauseOnHover    : true,
						// animation type
						type            : {
							// options: def | fade | seqFade | horizontalSlide | seqHorizontalSlide
							// verticalSlide | seqVerticalSlide | verticalSlideAlt | seqVerticalSlideAlt
							mode      : 'def',
							// speed of the transition
							speed     : 400,
							// easing type for the animation
							easing    : 'jswing',
							// this is the interval between each slide's animation 
							// used for seqFade, seqHorizontalSlide, seqVerticalSlide & seqVerticalSlideAlt  
							seqfactor : 100
						}
					};
					
					return this.each(function() {
						
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
							
							animTime;
							
						// fix height setting (add button height to it)
						settings.height += $buttons.outerHeight();
						
						// preload images
						aux.preloadImages( $slides, nmbSlides, $slideBgImage );
						
						// Check if need to hide content
						if( settings.hideContent === true ) $el.addClass('hide-content');
						
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
						
						if( settings.timeout > 0 ) var int = setInterval(autoPlay, settings.timeout);
						
						// The actual switching
						function swithSlide( $button, $curSlide, $curContent ) {
						
							clearTimeout(animTime);
							
							animTime = setTimeout(function() {
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
									
							}, 100);
						
						}
						
						// click event on the buttons:
						$buttons.bind( 'click', function(e) {
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
						});
						
						// click event on the pagination:
						$('a', $paginationContainer).bind( 'click', function(e) {
						
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
						});
						
						// Hover
						$el.hover(function() {
							if( settings.pauseOnHover ) clearInterval( int );
						}, function() {
							if( !$el.data('autoPlayStop') && settings.timeout > 0 ) int = setInterval(autoPlay, settings.timeout);
						});
						
						// Image link
						$slidesContainer.add( $slideImagesContainer ).click(function(e) {
						
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
							
						});

						// Resize window (responsive)
						$(window).resize(function() {
						
							if( $(window).width() > settings.width ) {
							
								// set the correct width of the buttons
								$buttons.each(function(i) {
									var $this = $(this);
									$this.css( 'max-width' , slideWidth - ( parseInt( $this.css('padding-left') ) + parseInt( $this.css('padding-right') ) ) + 'px' );
								});
								
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
									
								// stop autoplay							
								if( settings.pause ) {
									$el.data('autoPlayStop', true);
									clearInterval( int );
								}
								
								// Make things happening
								swithSlide( $button, $curSlide, $curContent );
							
							} else {
							
								// Show appropriate container
								$slidesContainer.hide();
								$slideImagesContainer.show();
								
								// Set content and pagination height
								var $curSlide              = $slideBgImage.eq( $el.find('.slide-button.active').index() ),
									$curContent            = $contentContainer.children('.slide-content_' + $curSlide.index() ),
									paginationButtonHeight = ( $content.eq( $curSlide.index() ).outerHeight() + parseInt( $contentContainer.css('padding-top') ) + parseInt( $contentContainer.css('padding-bottom') ) - 1 ) / 2;
								
								$contentContainer.css('height', $curContent.outerHeight() );
								
								$('.next', $paginationContainer).css('bottom', parseInt( $('.prev', $paginationContainer).css('bottom') ) + paginationButtonHeight + 1 + 'px');
								$('a', $paginationContainer).css('height', paginationButtonHeight );
								
								if( $curSlide.is(':hidden') ) $slideBgImage.hide();
								$curSlide.fadeIn().css('display', 'block');
								
								// set the correct width of the buttons		
								$buttons.css('max-width' , ( $el.outerWidth() - ( ( parseInt( $buttons.css('padding-left') ) + parseInt( $buttons.css('padding-right') ) ) * 2 ) ) / 2 + 'px');
								
								// "Fix" the position
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
								
									$contentContainer.add( $('.prev', $paginationContainer ) ).css('bottom', $el.outerHeight() - $slideImagesContainer.outerHeight() + 30);
								
									$('.next', $paginationContainer ).css('bottom', $el.outerHeight() - $slideImagesContainer.outerHeight() + 30 + $('.next', $paginationContainer ).outerHeight() );
							
								}
								
							}
							
						});
						
					});
				}
			}