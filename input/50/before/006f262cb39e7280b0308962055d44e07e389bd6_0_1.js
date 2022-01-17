function(e) {
	e.fake = true;
	target.dispatchEvent(e);
}