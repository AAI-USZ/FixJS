function visitModel(rootObject, callback, options, parentName, fullParentName) {
		// If nested object was already mapped previously, take the options from it
		if (parentName !== undefined && exports.isMapped(rootObject)) {
			//options = ko.utils.unwrapObservable(rootObject)[mappingProperty];
			options = mergeOptions(ko.utils.unwrapObservable(rootObject)[mappingProperty], options);
			parentName = "";
		}

		if (parentName === undefined) { // the first call
			visitedObjects = new objectLookup();
		}

		parentName = parentName || "";

		var mappedRootObject;
		var unwrappedRootObject = ko.utils.unwrapObservable(rootObject);
		if (!canHaveProperties(unwrappedRootObject)) {
			return callback(rootObject, fullParentName);
		} else {
			// Only do a callback, but ignore the results
			callback(rootObject, fullParentName);
			mappedRootObject = unwrappedRootObject instanceof Array ? [] : {};
		}

		visitedObjects.save(rootObject, mappedRootObject);

		var origFullParentName = fullParentName;
		visitPropertiesOrArrayEntries(unwrappedRootObject, function (indexer) {
			if (options.ignore && ko.utils.arrayIndexOf(options.ignore, indexer) != -1) return;

			var propertyValue = unwrappedRootObject[indexer];
			var fullPropertyName = getPropertyName(parentName, unwrappedRootObject, indexer);
			
			// If we don't want to explicitly copy the unmapped property...
			if (ko.utils.arrayIndexOf(options.copy, indexer) === -1) {
				// ...find out if it's a property we want to explicitly include
				if (ko.utils.arrayIndexOf(options.include, indexer) === -1) {
					// Options contains all the properties that were part of the original object.
					// If a property does not exist, and it is not because it is part of an array (e.g. "myProp[3]"), then it should not be unmapped.
					if (options.mappedProperties && !options.mappedProperties[fullPropertyName] && !(unwrappedRootObject instanceof Array)) {
						return;
					}
				}
			}

			fullParentName = getPropertyName(origFullParentName, unwrappedRootObject, indexer);
			
			var propertyType = exports.getType(ko.utils.unwrapObservable(propertyValue));
			switch (propertyType) {
			case "object":
			case "array":
			case "undefined":
				var previouslyMappedValue = visitedObjects.get(propertyValue);
				mappedRootObject[indexer] = (exports.getType(previouslyMappedValue) !== "undefined") ? previouslyMappedValue : visitModel(propertyValue, callback, options, fullPropertyName, fullParentName);
				break;
			default:
				mappedRootObject[indexer] = callback(propertyValue, fullParentName);
			}
		});

		return mappedRootObject;
	}