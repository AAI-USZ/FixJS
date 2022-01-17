function() {
				if ( typeof(fullscreen) == 'undefined' )
					return;

				if ( 'wp_mce_fullscreen' == ed.id )
					fullscreen.off();
				else
					fullscreen.on();
			}