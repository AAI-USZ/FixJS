function init_canvas() {
	show_spinner( c );
	var img = new Image();
	img.onload = function() {
		image.costume = img;
		clear_canvas( c );
		render_image( [ 0, 0 ] );
	};
	img.src = '/big/' + encodeURIComponent( $newhotness.attr('src') );
}