function() {
			if ( $( this ).val().length == 0 ) {
				$( this )
					.addClass( 'inline-hint' )
					.val( $( this ).data( 'hint' ) );
			} else {
				$( this ).removeClass( 'inline-hint' );
			}
		}