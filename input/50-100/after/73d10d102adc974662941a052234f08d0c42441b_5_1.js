function (i, choice) {
		if (choice.attributes.hasOwnProperty(attribute)) {
			$.each(choice.attributes[attribute].values, function (i2, possibleValue) {
				if (possibleValue.type === "value") {
					possibleValues.push(possibleValue.value);
				}
			});
			return false;
		}
	}