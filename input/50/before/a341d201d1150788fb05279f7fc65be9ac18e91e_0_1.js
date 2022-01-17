function(response) {
		response.propertySet = new TapAPI.collections.PropertySet(
			objectToArray(response.propertySet.property),
			this.id
		);

		return response;
	}