function (rootObject, callback, options) {
		if (arguments.length == 0) throw new Error("When calling ko.mapping.visitModel, pass the object you want to visit.");
		// Merge in the options used in fromJS
		options = mergeOptions(rootObject[mappingProperty], options);

		return visitModel(rootObject, callback, options);
	}