function( event ) {
				if ( event.keyCode !== $.ui.keyCode.TAB ) {
					return;
				}

				var tabbables = $( ":tabbable", uiDialog ),
					first = tabbables.filter( ":first" ),
					last  = tabbables.filter( ":last" );

				if ( event.target === last[0] && !event.shiftKey ) {
					first.focus( 1 );
					return false;
				} else if ( event.target === first[0] && event.shiftKey ) {
					last.focus( 1 );
					return false;
				}
			}