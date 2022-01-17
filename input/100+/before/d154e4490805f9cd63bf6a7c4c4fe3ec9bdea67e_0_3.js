function () {
	var that = this,
		selectedValues = this.attributeValue().split(" "),
		processedValues = [],
		availableValues;

	// remove currently selcted values from availableValues
	availableValues = this.possibleValues(this.currentAttribute);
	$.each(selectedValues, function (i, value) {
		var index = availableValues.indexOf(value);
		if (index !== -1) {
			availableValues.splice(index, 1);
		}
	});

	// remove duplicate values
	$.each(this.valueControls, function (i, valueControl) {
		var $this = $(this),
			value = $this.val();

		// check if it's a duplicate
		if (processedValues.indexOf(value) !== -1) {
			if (availableValues.length === 0) {
				// no more available values, set processedValues and setup again
				that.node.setAttr(that.currentAttribute, processedValues.join(" "));
				executeCommand('amendNode', [that.node.cslId, that.node]);
				that.setup();
				return;
			} else {
				// give it a new value
				value = availableValues.pop();
				$this.val(value);
				selectedValues.push(value);
			}
		}
		processedValues.push(value);
	});

	// remove currently selected values from other controls options
	$.each(this.valueControls, function (i, valueControl) {
		var $this = $(this);

		// remove all except current val
		$this.find('option[value!="' + $this.val() + '"]').remove();

		// add back the other available options
		$.each(availableValues, function (i, option) {
			$this.append('<option>' + option + '</option>');
		});
	});
}