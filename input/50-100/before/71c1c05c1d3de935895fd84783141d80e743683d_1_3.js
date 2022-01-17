function(dest, from) {

	dest.touches = from.touches;
	dest.targetTouches = from.targetTouches;
	dest.changedTouches = from.changedTouches;

	return this;
}