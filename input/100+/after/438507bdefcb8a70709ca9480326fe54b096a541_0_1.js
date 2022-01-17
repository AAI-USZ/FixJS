function ( i ) {
				var id = $(this).attr( 'id' ),
					state = $.cookie( 'vector-nav-' + id );
				// Add anchor tag to heading for better accessibility
				$( this ).find( 'h5' ).wrapInner( $( '<a href="#"></a>' ).click( false ) );
				// In the case that we are not showing the new version, let's show the languages by default
				if (
					state === 'true' ||
					( state === null && i < 1 ) ||
					( state === null && version === 1 && id === 'p-lang' )
				) {
					$(this)
						.addClass( 'expanded' )
						.removeClass( 'collapsed' )
						.find( '.body' )
						.hide() // bug 34450
						.show();
				} else {
					$(this)
						.addClass( 'collapsed' )
						.removeClass( 'expanded' );
				}
				// Re-save cookie
				if ( state !== null ) {
					$.cookie( 'vector-nav-' + $(this).attr( 'id' ), state, { 'expires': 30, 'path': '/' } );
				}
			}