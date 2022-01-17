function debug() {
	if (exports.debug) {
		console.log.apply(console, arguments);
	}
}