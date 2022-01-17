function (attrIndex, attribute) {
		var selectedValues = that.attributeValue(attribute.key).split(" "),
			processedValues = [],
			availableValues;

		if (attribute.key !== "match") {
			// remove currently selcted values from availableValues
			availableValues = that.possibleValues(attribute.key);
			$.each(selectedValues, function (i, value) {
				var index = availableValues.indexOf(value);
				if (index !== -1) {
					availableValues.splice(index, 1);
				}
			});

			// remove duplicate values
			$.each(that.valueControls, function (i, valueControl) {
				if (that.conditions[i].attribute === attribute.key) {
					var $this = $(this),
						value = $this.val();

					// check if it's a duplicate
					if (processedValues.indexOf(value) !== -1) {
						if (availableValues.length === 0) {
							// no more available values, set processedValues and setup again
							that.node.setAttr(attribute.key, processedValues.join(" "));
							that.executeCommand('amendNode', [that.node.cslId, that.node]);
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
				}
			});

			console.log("removing selected values from " + that.valueControls.length);
			// remove currently selected values from other controls options
			$.each(that.valueControls, function (i, valueControl) {
				if (that.conditions[i].attribute === attribute.key) {
					var $this = $(this);

					// remove all except current val
					$this.find('option[value!="' + $this.val() + '"]').remove();

					//console.log("adding available options: " + availableOptions.length);

					// add back the other available options
					$.each(availableValues, function (i, option) {
						$this.append('<option>' + option + '</option>');
					});
				}
			});
		}
	}