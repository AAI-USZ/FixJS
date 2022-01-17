function(properties) {
		// copying only those properties we can render.
		for (var property in documentProperties){
			if (documentProperties.hasOwnProperty(property) && properties[property]) {
				documentProperties[property] = properties[property]
			}
		}
		return this
	}