function(response) {

		if (response.propertySet !== undefined) {
			response.propertySet = new TapAPI.collections.PropertySet(
				objectToArray(response.propertySet.property),
				this.id
			);
		}

		return response;
	}