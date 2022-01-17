function() {
		var returnObject = {};

		for (attribute in this) {
			if(typeof this[attribute] != 'function' && this.checkFieldValidity(attribute)) {
				returnObject[attribute] =this[attribute];
			}
		}

		return returnObject;
	}