function( e ) {
			

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
		}