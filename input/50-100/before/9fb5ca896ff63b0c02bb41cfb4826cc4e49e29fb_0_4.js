function onload(elem, e, ctx) {
		return function() {
			draw(e, ctx);
			// Run callback function if defined
			if (params.load) {
				params.load.call(elem, args);
			}
		};
	}