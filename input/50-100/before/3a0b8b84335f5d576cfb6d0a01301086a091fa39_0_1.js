function( fx ) {
	var elem = $( fx.elem ),
		data = elem.data( "accordionHeight" );
	elem.height( data.total - elem.outerHeight() - data.toHide.outerHeight() + elem.height() );
}