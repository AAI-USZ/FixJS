function clear_canvas( c ) {
	var h = c.height,
		w = c.width,
		ctx = c.getContext('2d');
	if( c.spinInterval ) {
		clearInterval( c.spinInterval );
		delete c.spinInterval;
	}
	ctx.clearRect(0,0,h,w);
}