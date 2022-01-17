function( id ) {
		return $( "<div></div>" )
					.attr( "id", id )
					.addClass( "ui-tabs-panel ui-widget-content ui-corner-bottom" )
					.data( "ui-tabs-destroy", true );
	}