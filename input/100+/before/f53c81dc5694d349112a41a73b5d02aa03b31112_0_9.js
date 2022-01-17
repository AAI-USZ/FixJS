function() {

		var $player = $('video, audio');

		if( $player.length ) {

			$player.mediaelementplayer({
				audioWidth  : '100%',
				audioHeight : '30px',
				videoWidth  : '100%',
				videoHeight : '100%'
			});

			// Fix for player, if in Image Gallery Slider
			$('.mejs-fullscreen-button').on('click', 'button', function() {
			
				if( $(this).hasParent('.image-gallery-slider ul') ) {

					// Minimize
					if( $(this).parent().hasClass('mejs-unfullscreen') ) {

						$(this).parents('.image-gallery-slider ul').css({
							'height'   : $(this).parents('.image-gallery-slider ul').height(),
							'overflow' : 'hidden',
							'z-index'  : ''
						});

					// Enlarge
					} else {

						// Add temporary styling so cycle slider won't screw up the height totally
						$('head').append('<style class="ss-temp-slider-styles"> .image-gallery-slider ul { height: ' + $(this).parents('.image-gallery-slider ul').css('height') + ' !important; } </style>')

						$(this).parents('.image-gallery-slider ul').css({
							'overflow' : 'visible',
							'z-index'  : '999'
						});

					}
				}

			});

			// Same thing but with an ESC key
			$(document).keyup(function(e) {

				// Minimize
				if (e.keyCode == 27) {

					$('.mejs-fullscreen-button').parents('.image-gallery-slider ul').css({
						'height'   : $('.mejs-fullscreen-button').parents('.image-gallery-slider ul').height(),
						'overflow' : 'hidden',
						'z-index'  : ''
					});

				}

			});

		}

	}