function() {
			// If vertical playlist and not in fullscreen, update playerContainer height
			if( $('#container').hasClass('vertical') && ! $('#container').hasClass('fullscreen') ) {
				$('#playerContainer').height( window.innerHeight - $('#playlistContainer').outerHeight( true ) );
			}
		}