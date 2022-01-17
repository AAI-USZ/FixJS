function debug() {
	if (exports.debug) {
		console.log.apply(this, arguments);
	}
}