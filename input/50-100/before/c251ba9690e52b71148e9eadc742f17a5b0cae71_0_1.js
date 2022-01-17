function build (name, properties) {
			if (!definitions.hasOwnProperty(name)) {
				throw new ReferenceError('Object Not Defined');
			}
		    var definition = cloner(definitions[name]);
		    properties = properties || {};
		    return merge(definition, properties);
		}