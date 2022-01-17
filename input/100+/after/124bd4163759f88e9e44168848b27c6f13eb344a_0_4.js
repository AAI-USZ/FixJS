function( $, document, window ){
/*global jQuery:true, Image, document */
	'use strict';

	/**
	 * jQuery function to display a mobile friendly slideshow rather
	 * than a lightbox.  I love lightbox's (especially colorbox),
	 * however they always seem to suck on my ipod touch.  The image
	 * is always really small, the close button is about 1px and impossible
	 * to click and sometimes the image is completely off the screen.
	 * This plugin will generate a mobile friendly (ipod, iphone, android)
	 * image view.  It works with a single image or gallery with a similar
	 * api to [colorbox](http://www.jacklmoore.com/colorbox)
	 *
	 * @param params {Object} options/configuration
	 *    * counter {String}. The counter in the title bar. Defaults to `{i} of {t}`
	 *      `{i}` gets replaced with the index and {t} is the total number of images
	 *      in the group or 1 if no group
	 *    * isTouch {Boolean} for development purposes I needed a way to force touch
	 *      device. The mobileBox does not run when run in Chrome, but if you set
	 *      this parameter to true and the browser size is smaller that 480, it works.
	 *    * disableWithMaxWidth {Integer} also mainly used for testing, but if you
	 *      want mobileBox to fire with devices that have a screensize greater than
	 *      the defauly 480, specify a size here in px
	 */
	$.fn.mobileBox = function( params ) {

		var options = {
			counter: '{i} of {t}',
			isTouch: 'ontouchstart' in document.documentElement,
	
		};
		

		$.extend( options, params );

		$( this ).addClass( '_mobileBox' );

		$( this ).click( function( e ) {
			

			if (!$('#mobileBoxViewport').length) {
				$('head').append('<meta name="viewport" id="mobileBoxViewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;" />');
			} else {
				$('#mobileBoxViewport').attr('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;');
			}
			
			screenHeight = window.innerHeight;
			screenWidth = window.innerWidth;


			//first, check that its a screen size smaller than
			//480 or users option value and the browswer
			//has access to `event.originalEvent.targetTouches`
			if ( ! options.isTouch ) {
				//not gonna run mobileBox
				return;
			}

			var href       = $( this ).attr( 'href' ),
				title      = $( this ).attr( 'title' ),
				cssClasses = $( this ).attr( 'class' ).split(' '),
				img        = new Image();
				img.src    = href;


			//Handle grouping information
			var group = [];
			//need to bind to all items with the same class
			for ( var i = 0; i < cssClasses.length; i++ ){
				var klass = cssClasses[i];
				if ( klass === '_mobileBox' ) {
					continue;
				}
				
				var klasses = $( '.' + klass);
				for ( var n = 0; n < klasses.length; n++ ){
					var el = klasses[n];
					if (group.indexOf(el) === -1) {
						group.push(el);
					}
				}
			}
			var clickedElIndex = $(group).index(this);
			//end groups

			//image is ready, load the ui for the first time
			getImageDimensions( img, function( width, height, spacing ){
				
				var t = (group.length) ? group.length : 1,
					c = options.counter
							.replace('{i}', clickedElIndex + 1 )
							.replace('{t}', t );

				//generate the template
				//replace the {src}, {title}, and {counter}
				var $template = $( template.replace('{src}', href )
					.replace( '{title}', title )
					.replace('{counter}', c)
				);

				//append the first image
				$('.mobileBox', $template).append( this );
				//attach the close box button
				$( '.mobileBoxDone a', $template ).bind( 'click', closeBox );
				//add the template
				$( 'body' ).prepend( $template );

				//bind to the swiping gestures
				swiper( $( '.mobileBox' ), group, clickedElIndex );
			});


			//@TODO rather than return false, I should unbind
			//to any mobileBox el prior to calling?
			return false;
		});

		var screenWidth  = 0,
			screenHeight = 0,
			layout       = 'landscape';

		//template for mobileBox
		var template = [
			'<div class="mobileBoxWrapper">',
				'<div class="mobileBoxBg"></div>',
				'<div class="mobileBox">',
					'<div class="mobileBoxHeader">',
						'<span class="mobileBoxDone"><a href="#done">Done</a></span>',
						'<span class="mobileBoxCounter">{counter}</span>',
					'</div>',
					'<div class="mobileBoxTitle">{title}</div>',
				'</div>',
			'<div>'
		].join('');


		/**
		 * Gets the image dimensions prior to it being loaded to the screen
		 * Also applies css to the image to make it fit properly
		 * @param img {Image}
		 * @param cb {Function} image callback(width, height, spacing)
		 * has the context of the image
		 */
		var getImageDimensions = function( img, cb ) {
			//load the image being clicked
			$( img ).load( function( e ) {
				var target = e.currentTarget;
				if ( target.width < target.height ) {
					layout = 'portrait';
				}

				var vertical_spacing = screenHeight - target.height;


				vertical_spacing = (vertical_spacing >= 0) ? ((vertical_spacing/4)) : 0;
					
				//need to set the css width so it does not stretch
				if ( target.width < screenWidth ) {
					$(img).css({width: target.width + 'px'});
				}

				if (target.height > target.width && target.height > screenHeight) {
					$(img).css({width:'auto', height: (screenHeight-100)+'px'});
					//calc the spacing
					var r = target.width/ target.height,
						s = (r * (screenHeight) ) / 2;

					$(img).css({'left':s + 'px'});

				}

				$(img).css({'margin-top': vertical_spacing +'px'} );

				cb.call( img, target.width, target.height, vertical_spacing );
			});
		};

		/**
		 * function to close the slideshow
		 */
		var closeBox = function( ) {
			$( '.mobileBoxWrapper' ).fadeOut( function() {
				//update later to fix viewport changing back to normal
				//without the window.location hack
				window.location = window.location;
				//$(this).remove();
				//$('#mobileBoxViewport').attr('content', 'width='+document.documentElement.scrollWidth +',  user-scalable=yes;' );

			});


			return false;
		};

		/**
		 * Bind to touch sliding gesture
		 * credits: https://gist.github.com/936253
		 *          http://plugins.jquery.com/project/swipe
		 *          http://ryanscherf.com/demos/swipe/
		 *
		 * @param el {jQuery} mobileBox template
		 * @param group {Array} list of items
		 * @param index {Integer} index of clicked element
		 */
		var swiper = function( el, group, index ) {
			
			var self = el;
			
			/**
			 * when the user swipes, i should load the
			 * element from the group either
			 * before or after the current index
			 * @param increment {Integer}
			 *
			 */
			var loadNextImage = function( increment ) {
				
				if (index + increment >= 0 && index + increment < group.length) {
					var newIndex  = index + increment,
						$nextImage = $( group[ newIndex ] );

					//@TODO: update to calculate the speed

					//move the old image out
					$('.mobileBox img').animate({
						left:  ( ( increment < 0 ) ? '+' : '-' ) + '=' + screenWidth
					}, 200, function(){
						$(this).remove();
					});

					//move the new image in
					var img        = new Image();
						img.src    = $nextImage.attr('href');

					//load the next image
					getImageDimensions( img, function(width, height, spacing){
						var animateObj         = {},
							horizontal_spacing = 0;

						//calculate the horizontal spacing if the image is less than the width
						if ( width < screenWidth ) {
							var r = width / height;
							horizontal_spacing = (r * (screenHeight) ) / 2;
						}

						if (increment > 0) {
							$(this).css( {right:'-'+screenWidth + 'px'} );
							animateObj.right = horizontal_spacing + 'px';
						} else {
							$(this).css( {left:'-'+screenWidth + 'px'} );
							animateObj.left = horizontal_spacing+'px';
						}
						$('.mobileBoxTitle').html( $nextImage.attr('title') );
						$('.mobileBoxCounter').html( (newIndex+1) + ' of ' + group.length );
						$( '.mobileBox' ).append( this );
						$(this).animate(animateObj, 200);

					});



					//alter the index
					index = index + increment;
				}
				
			};

			var originalCoord = { 'x': 0, 'y': 0 },
			    finalCoord = { 'x': 0, 'y': 0 },
			    options = {
					'threshold': {
						'x': 10,
						'y': 100
					},
					'swipeLeft': function() {
						//slide image left
						loadNextImage(1);
					},
					'swipeRight': function() {
						//slide image right
						loadNextImage(-1);
					}
			    };

			function touchStart(event) {

				var touch = event.originalEvent.targetTouches[0];
				originalCoord.x = touch.pageX;
				originalCoord.y = touch.pageY;
			}

			// Store coordinates as finger is swiping
			function touchMove(event) {
				var touch = event.originalEvent.targetTouches[0];
				finalCoord.x = touch.pageX; // Updated X,Y coordinates
				finalCoord.y = touch.pageY;
				event.preventDefault();
			}

			// Swipe was canceled
			function touchCancel() {
				//console.log('Canceling swipe gesture')
			}

			// Done swiping
			// Swipe should only be on X axis, ignore if swipe on Y axis
			// Calculate if the swipe was left or right
			function touchEnd() {
				var changeY = originalCoord.y - finalCoord.y,
				    changeX,
				    threshold = options.threshold,
				    y = threshold.y,
				    x = threshold.x;
				if (changeY < y && changeY > (- y)) {
					changeX = originalCoord.x - finalCoord.x;
					if (changeX > x) {
						options.swipeLeft.call(self);
					} else if (changeX < (- x)) {
						options.swipeRight.call(self);
					}
				}
			}

			$(self)
				.bind('touchstart.swipe', touchStart)
				.bind('touchmove.swipe', touchMove)
				.bind('touchend.swipe', touchEnd)
				.bind('touchcancel.swipe', touchCancel);
		};
	};


}