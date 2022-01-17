function init_canvas() {
	show_spinner( c );

	// load the big version of the character first
	var character = new Image();
	character.onload = function() {
		image.character = character;
		if( !costume_specified ) ready();
	};
	character.src = '/big/' + encodeURIComponent( $oldbusted.attr('src') );

	// load the big version of the costume ( if specified )
	if( costume_specified ) {
		var costume = new Image();
		costume.onload = function() {
			image.costume = costume;
			ready();
		};
		costume.src = '/big/' + encodeURIComponent( $newhotness.attr('src') );
	}

	function ready() {
		if( c.spinInterval ) {
			clearInterval( c.spinInterval );
			delete c.spinInterval;
		}
		var ctx = c.getContext('2d');
		ctx.clearRect(0,0,c.height,c.width);
		render_image( c._highlighted );

		// starts the animation loop
		window.onEachFrame( animation_loop );

	}
}