function invokeAll(facet, wire) {
		var options = facet.options;

		if(typeof options == 'string') {
			return invoke(options, facet, [], wire);

		} else {
			var promises, func;
			promises = [];

			for(func in options) {
				promises.push(invoke(func, facet, options[func], wire));
			}

			return whenAll(promises);
		}
	}