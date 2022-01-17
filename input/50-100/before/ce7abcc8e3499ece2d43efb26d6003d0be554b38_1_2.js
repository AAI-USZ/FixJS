function() {
		var returnObject = {};

		for (attribute in this) {
			if(typeof this[attribute] != 'function' && this.checkFieldValidity(attribute)) {
				eval('returnObject.'+attribute+'=this[attribute]');
			}
		}

		return returnObject;
	}