function handler(event) {

	var args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true;

	event = $.event.fix(event || window.event);

	event.type = "mousewheel";

	if ( event.wheelDelta ) delta = event.wheelDelta/120;

	if ( event.detail     ) delta = -event.detail/3;

	args.unshift(event, delta);

	return $.event.handle.apply(this, args);

}