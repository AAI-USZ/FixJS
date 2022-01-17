function(data) {
		for (attribute in this) {
			if(typeof this[attribute] != 'function' && attribute != 'skinCoordinates' && attribute != 'animationList' && this.checkFieldValidity(attribute)) {
				if (data[attribute] != undefined) this[attribute] = data[attribute];
			}
		}
	}