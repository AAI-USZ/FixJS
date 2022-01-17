function (i, condition) {
		var mainOption,
			mainOptionControl,
			valueControl,
			subOptionControl;

		// create mainOption
		mainOptionControl = $('<select></select>');
		$.each(that.mainOptions, function (mainOption, properties) {
			mainOptionControl.append('<option>' + mainOption + '</option>');
		});
		mainOption = that.attributeUi[condition.attribute].mainOption;
		mainOptionControl.val(mainOption);
		that.mainOptionControls.push(mainOptionControl);

		// create subOptionControl
		if (that.mainOptions[mainOption].length > 1) {
			subOptionControl = $('<select></select>');
			$.each(that.mainOptions[mainOption], function (i, properties) {
				subOptionControl.append($('<option>' + properties.subOption + '</option>'));
				if (condition.attribute === properties.attribute) {
					subOptionControl.val(properties.subOption);
				}
			});
		} else {
			subOptionControl = $('<span></span>');
			$.each(that.mainOptions[mainOption], function (i, properties) {
				subOptionControl.append(properties.subOption);
			});
		}
		that.subOptionControls.push(subOptionControl);
		
		// create value control
		valueControl = $('<select class="valueSelect"></select>');
		$.each(that.possibleValues(condition.attribute), function (i, possibleValue) {
			valueControl.append('<option>' + possibleValue + '</option>');
		});
		valueControl.val(condition.value);
		that.valueControls.push(valueControl);
	}