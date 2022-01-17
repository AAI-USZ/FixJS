function onload() {
		create();
		// Run callback function if defined
		if (params.load) {
			params.load.call($elems[0], pattern);
		}
	}