function() {
		if ( $( '#p-cactions' ).css( 'display' ) == 'none' ) {
			$( '#p-cactions' )
				.addClass( 'filledPortlet' ).removeClass( 'emptyPortlet' )
				.find( 'h5' )
					.css( 'width','1px' ).animate( { 'width':'26px' }, 390 );
		}
	}