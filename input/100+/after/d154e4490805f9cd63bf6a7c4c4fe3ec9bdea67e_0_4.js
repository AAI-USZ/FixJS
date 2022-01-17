function (attribute) {
	// get possible values from schema
	var possibleValues = [];
	$.each(CSLEDIT.schema.choices("choose/if"), function (i, attributes) {
		if (attributes.hasOwnProperty(attribute)) {
			$.each(attributes[attribute].values, function (i2, possibleValue) {
				if (possibleValue.type === "value") {
					possibleValues.push(possibleValue.value);
				}
			});
			return false;
		}
	});

	// for MLZ schema which doesn't put the values in choices
	if (possibleValues.length === 0 && attribute in CSLEDIT.schema.attributes("choose/if")) {
		$.each(CSLEDIT.schema.attributes("choose/if")[attribute].values, function (i, possibleValue) {
			if (possibleValue.type === "value") {
				possibleValues.push(possibleValue.value);
			}
		});
	};

	return possibleValues;
}