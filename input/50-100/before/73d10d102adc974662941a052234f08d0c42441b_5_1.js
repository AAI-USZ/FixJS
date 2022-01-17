function (i, attributes) {
		if (attributes.hasOwnProperty(attribute)) {
			$.each(attributes[attribute].values, function (i2, possibleValue) {
				if (possibleValue.type === "value") {
					possibleValues.push(possibleValue.value);
				}
			});
			return false;
		}
	}