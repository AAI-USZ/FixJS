function toggle( $element ) {
		$.cookie(
			'vector-nav-' + $element.parent().attr( 'id' ),
			$element.parent().is( '.collapsed' ),
			{ 'expires': 30, 'path': '/' }
		);
		$element
			.parent()
			.toggleClass( 'expanded' )
			.toggleClass( 'collapsed' )
			.find( 'div.body' )
			.slideToggle( 'fast' );
	}