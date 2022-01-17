function(e) {
	dispatch('touchend', target, e);
	target = null;
	down = false;
}