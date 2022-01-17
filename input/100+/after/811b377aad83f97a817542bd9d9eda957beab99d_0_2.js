function( ul, item ) {
		return $( "<li></li>" )
			.append( $( "<a></a>" ).text( item.label ) )
			.appendTo( ul );
	}