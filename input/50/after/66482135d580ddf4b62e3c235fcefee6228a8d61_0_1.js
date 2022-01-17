function(hyper, undefined) {

	function debug(message) {
		if (!HYPER_DEBUG) {
			return;
		}

		console.log(message);
	}

	hyper.debug = debug;

	return hyper;

})({}