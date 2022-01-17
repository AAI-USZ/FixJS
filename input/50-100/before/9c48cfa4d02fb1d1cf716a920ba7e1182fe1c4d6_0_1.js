function get_square_coords( e ) {
	// firefox fix
	var x = e.hasOwnProperty('offsetX') ? e.offsetX : e.layerX;
	var y = e.hasOwnProperty('offsetY') ? e.offsetY : e.layerY;
	return {
		Y: Math.floor(y / 48),
		X: Math.floor(x / 48)
	};
}