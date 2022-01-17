function() {

		var $player = $('.video-js');

		if( $player.length ) {

			function adjustPlayer() {
			
				$player.each(function( i ) {

					var $this        = $(this)
						playerWidth  = $this.parent().width(),
						playerHeight = playerWidth / ( $this.children('.vjs-tech').data('aspect-ratio') || 1.78 );

					if( playerWidth <= 300 ) {
						$this.addClass('vjs-player-width-300');
					} else {
						$this.removeClass('vjs-player-width-300');
					}

					if( playerWidth <= 250 ) {
						$this.addClass('vjs-player-width-250');
					} else {
						$this.removeClass('vjs-player-width-250');
					}

					$this.css({
						'height' : playerHeight,
						'width'  : playerWidth
					})
					.attr('height', playerHeight )
					.attr('width', playerWidth );

				});

			}

			adjustPlayer();

			$(window).on('resize', function() {

				var timer = window.setTimeout( function() {
					window.clearTimeout( timer );
					adjustPlayer();
				}, 30 );

			});

		}

	}