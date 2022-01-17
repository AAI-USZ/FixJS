function(data) {
		for (attribute in this) {
			if(typeof this[attribute] != 'function' && attribute != 'skinCoordinates' && attribute != 'animationList' && this.checkFieldValidity(attribute)) {
				eval('this.'+attribute+'=data[attribute]');
			}
		}
	}