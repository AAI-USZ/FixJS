function build (name, properties) {
			if (!definitions.hasOwnProperty(name)) {
				throw new ReferenceError('JSONFactory: No Definition for ' + name);
			}
		    var definition = cloner(definitions[name]);
		    properties = properties || {};
		    return merge(definition, properties);
		}