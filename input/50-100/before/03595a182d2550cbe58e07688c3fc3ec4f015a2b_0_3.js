function () {
	var availableValues = this.possibleValues(this.currentAttribute),
		selectedValues = this.attributeValue();

	// remove currently selcted values from availableValues
	$.each(this.attributeValue().split(" "), function (i, value) {
		var index = availableValues.indexOf(value);
		if (index !== -1) {
			availableValues.splice(index, 1);
		}
	});
	return availableValues;
}