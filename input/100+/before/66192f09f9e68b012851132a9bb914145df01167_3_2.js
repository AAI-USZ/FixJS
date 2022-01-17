function (rootObject, options) {
		if (arguments.length == 0) throw new Error("When calling ko.mapping.toJS, pass the object you want to convert.");
		// Merge in the options used in fromJS
		options = mergeOptions(rootObject[mappingProperty], options);

		// We just unwrap everything at every level in the object graph
		return visitModel(rootObject, function (x) {
			return ko.utils.unwrapObservable(x)
		}, options);
	}