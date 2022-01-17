function(e) {
	if (e.fake) return;
	e.fake = true;
	target.dispatchEvent(e);
}