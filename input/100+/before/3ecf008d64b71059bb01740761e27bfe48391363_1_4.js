function draw() {
	if( c._mouse == 'lock' ) $highlighter.css({background: '#f00'});
	else $highlighter.css({background: ''});
	if( c._queue.length ) {
		var o = c._queue.shift();
		$highlighter.show();
		$highlighter.css( {
			left: o[0] * 48,
			top: o[1] * 48
		} );
		render_image( o );
	}
}