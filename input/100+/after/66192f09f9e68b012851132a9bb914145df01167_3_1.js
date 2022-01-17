function (jsObject /*, inputOptions, target*/ ) {
		if (arguments.length == 0) throw new Error("When calling ko.fromJS, pass the object you want to convert.");

		// When mapping is completed, even with an exception, reset the nesting level
		window.setTimeout(function () {
			mappingNesting = 0;
		}, 0);

		if (!mappingNesting++) {
			dependentObservables = [];
			visitedObjects = new objectLookup();
		}

		var options;
		var target;

		if (arguments.length == 2) {
			if (arguments[1][mappingProperty]) {
				target = arguments[1];
			} else {
				options = arguments[1];
			}
		}
		if (arguments.length == 3) {
			options = arguments[1];
			target = arguments[2];
		}

		if (target) {
			options = merge(options, target[mappingProperty]);
		}
		options = fillOptions(options);

		var result = updateViewModel(target, jsObject, options);
		if (target) {
			result = target;
		}

		// Evaluate any dependent observables that were proxied.
		// Do this in a timeout to defer execution. Basically, any user code that explicitly looks up the DO will perform the first evaluation. Otherwise,
		// it will be done by this code.
		if (!--mappingNesting) {
			window.setTimeout(function () {
				while (dependentObservables.length) {
					var DO = dependentObservables.pop();
					if (DO) DO();
				}
			}, 0);
		}

		// Save any new mapping options in the view model, so that updateFromJS can use them later.
		result[mappingProperty] = merge(result[mappingProperty], options);

		return result;
	}