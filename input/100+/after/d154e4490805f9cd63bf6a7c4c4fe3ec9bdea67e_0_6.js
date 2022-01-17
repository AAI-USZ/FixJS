function () {
	var that = this;

	this.conditions = [];

	$.each(this.node.attributes, function (i, attribute) {
		if (attribute.key !== "match" && attribute.enabled) {
			$.each(attribute.value.split(" "), function (i, value) {
				that.conditions.push({
					attribute : attribute.key,
					value : value
				});
			});
		}
	});
	
	// set matchSelect value
	this.matchSelect.val(this.node.getAttr('match') || 
			CSLEDIT.schema.attributes("choose/if").match.defaultValue);

	if (this.conditions.length === 0) {
		// should show at least one attribute value, so create one
		// NOTE: this is slightly strange behaviour for a view
		//       but should never happen - only after loading an
		//       invalid style

		this.node.setAttr("type", "article");
		this.node.setAttr("match", "any");
		that.executeCommand('amendNode', [this.node.cslId, this.node]);
		this.setup();
		return;
	}

	this.mainOptionControls = [];
	this.valueControls = [];
	this.subOptionControls = [];
	$.each(that.conditions, function (i, condition) {
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
	});

	this.drawControls();

	this.removeDuplicateOptions();
/*
	// event handlers
	this.mainOptionSelect.on('change', function () {
		console.log("change");
		that.currentAttribute = null;
		$.each(that.attributeUi, function (attribute, ui) {
			if (that.currentAttribute === null && ui.mainOption === that.mainOptionSelect.val()) {
				that.node.setAttrEnabled(attribute, true, that.possibleValues(attribute)[0]);
				that.currentAttribute = attribute;
			} else {
				that.node.setAttrEnabled(attribute, false);
			}
		});
		console.log('currentAttr = ' + that.currentAttribute);
		that.executeCommand('amendNode', [that.node.cslId, that.node]);
		that.setup();
	});

	if (this.subOptionControl.is('select')) {
		this.subOptionControl.on('change', function () {
			// when changing a sub-option, keep the space-separated value list the same
			var currentAttributeValue = that.attributeValue();
			$.each(that.attributeUi, function (attribute, ui) {
				if (ui.mainOption === that.mainOptionSelect.val() &&
						ui.subOption === that.subOptionControl.val()) {
					that.node.setAttr(attribute, currentAttributeValue);
					that.currentAttribute = attribute;
				} else {
					that.node.setAttrEnabled(attribute, false);
				}
			});
			that.executeCommand('amendNode', [that.node.cslId, that.node]);
		});
	}

	this.element.find('select.valueSelect').on('change', function () {
		that.removeDuplicateOptions();
		that.node.setAttr(that.currentAttribute, that.attributeValue());
		that.executeCommand('amendNode', [that.node.cslId, that.node]);
	});

	this.element.find('button.addValue').on('click', function () {
		if (that.availableValues().length === 0) {
			alert("No more available values");
			return;
		}
		that.node.setAttr(that.currentAttribute, that.attributeValue() + " " +
			that.availableValues()[0]);
		that.executeCommand('amendNode', [that.node.cslId, that.node]);
		that.setup();
	});

	this.element.find('button.deleteValue').on('click', function (event) {
		var index = that.element.find('button.deleteValue').index(event.target),
			valueList = that.node.getAttr(that.currentAttribute).split(" ");

		console.log("index = " + index);
		console.log("value list = " + valueList.join(", "));

		valueList.splice(index, 1);
		console.log("value list after = " + valueList.join(", "));

		that.node.setAttr(that.currentAttribute, valueList.join(" "));
		that.executeCommand('amendNode', [that.node.cslId, that.node]);
		that.setup();
	});
	
	this.matchSelect.on('change', function () {
		that.node.setAttr('match', that.matchSelect.val());
		that.executeCommand('amendNode', [that.node.cslId, that.node]);
		that.setup();
	});*/
}