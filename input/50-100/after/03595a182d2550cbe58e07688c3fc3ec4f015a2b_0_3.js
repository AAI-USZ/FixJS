function (attribute) {
	var availableValues = this.possibleValues(attribute),
		selectedValues = this.attributeValue();

	// remove currently selcted values from availableValues
	$.each(this.attributeValue(attribute).split(" "), function (i, value) {
		var index = availableValues.indexOf(value);
		if (index !== -1) {
			availableValues.splice(index, 1);
		}
	});
	return availableValues;
}