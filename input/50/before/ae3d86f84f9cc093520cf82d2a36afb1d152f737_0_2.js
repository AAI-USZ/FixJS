function destroyTouch (cont, opts) {
	//TOUCHMOD -- DESTROY TOUCHMOD RELATED EVENT LISTENERS.
	var $cont = $(cont);
	$cont.unbind('touchstart touchmove touchend touchcancel');

	if (opts.touchClickDrag) {
		$cont.unbind( 'mousedown mousemove mouseup' );
	}
}