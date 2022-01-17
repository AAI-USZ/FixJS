function fillOptions(options, otherOptions) {
		options = options || {};

		// Is there only a root-level mapping present?
		if ((options.create instanceof Function) || (options.update instanceof Function) || (options.key instanceof Function) || (options.arrayChanged instanceof Function)) {
			options = {
				"": options
			};
		}

		if (otherOptions) {
			options.ignore = mergeArrays(otherOptions.ignore, options.ignore);
			options.include = mergeArrays(otherOptions.include, options.include);
			options.copy = mergeArrays(otherOptions.copy, options.copy);
		}
		options.ignore = mergeArrays(options.ignore, defaultOptions.ignore);
		options.include = mergeArrays(options.include, defaultOptions.include);
		options.copy = mergeArrays(options.copy, defaultOptions.copy);

		options.mappedProperties = options.mappedProperties || {};
		return options;
	}