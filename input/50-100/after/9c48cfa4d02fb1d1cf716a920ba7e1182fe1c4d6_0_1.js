function get_square_coords( e ) {
	// firefox fix
	var oe = e.originalEvent,
		x = ( oe.offsetX == undefined ? oe.layerX : oe.offsetX ),
		y = ( oe.offsetY == undefined ? oe.layerY : oe.offsetY );
	return {
		Y: Math.floor( y / 48 ),
		X: Math.floor( x / 48 )
	};
}