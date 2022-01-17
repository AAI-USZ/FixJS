function () {
	var that = this,
		mainOption;

	// set mainOptionSelect value
	$.each(this.node.attributes, function (i, attribute) {
		if (attribute.enabled) {
			var attributeProperty = that.attributeUi[attribute.key];
			if (typeof attributeProperty !== "undefined") {
				console.log("attr = " + attribute.key);
				mainOption = attributeProperty.mainOption;
				that.mainOptionSelect.val(mainOption);
			}
		}
	});

	// set matchSelect value
	this.matchSelect.val(this.node.getAttr('match') || 
			CSLEDIT.schema.attributes("choose/if").match.defaultValue);

	if (typeof mainOption === "undefined") {
		// should show at least one attribute value, so create one
		// NOTE: this is slightly strange behaviour for a view
		//       but should never happen - only after loading an
		//       invalid style

		this.node.setAttr("type", "article");
		this.node.setAttr("match", "any");
		executeCommand('amendNode', [this.node.cslId, this.node]);
		this.setup();
		return;
	}

	// create subOptionControl
	if (this.mainOptions[mainOption].length > 1) {
		this.subOptionControl = $('<select></select>');
		$.each(this.mainOptions[mainOption], function (i, properties) {
			that.subOptionControl.append($('<option>' + properties.subOption + '</option>'));
			if (that.node.hasAttr(properties.attribute)) {
				that.subOptionControl.val(properties.subOption);
				that.currentAttribute = properties.attribute;
			}
		});
	} else {
		this.subOptionControl = $('<span></span>');
		$.each(this.mainOptions[mainOption], function (i, properties) {
			that.subOptionControl.append(properties.subOption);
			that.currentAttribute = properties.attribute;
		});
	}

	// create valueControls
	this.valueControls = [];
	$.each(this.node.getAttr(this.currentAttribute).split(" "), function (i, value) {
		var valueControl = $('<select class="valueSelect"></select>');
		$.each(that.possibleValues(that.currentAttribute), function (i, possibleValue) {
			valueControl.append('<option>' + possibleValue + '</option>');
		});
		valueControl.val(value);
		that.valueControls.push(valueControl);
	});

	this.drawControls();

	this.removeDuplicateOptions();

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
		executeCommand('amendNode', [that.node.cslId, that.node]);
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
			executeCommand('amendNode', [that.node.cslId, that.node]);
		});
	}

	this.element.find('select.valueSelect').on('change', function () {
		that.removeDuplicateOptions();
		that.node.setAttr(that.currentAttribute, that.attributeValue());
		executeCommand('amendNode', [that.node.cslId, that.node]);
	});

	this.element.find('button.addValue').on('click', function () {
		if (that.availableValues().length === 0) {
			alert("No more available values");
			return;
		}
		that.node.setAttr(that.currentAttribute, that.attributeValue() + " " +
			that.availableValues()[0]);
		executeCommand('amendNode', [that.node.cslId, that.node]);
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
		executeCommand('amendNode', [that.node.cslId, that.node]);
		that.setup();
	});
	
	this.matchSelect.on('change', function () {
		that.node.setAttr('match', that.matchSelect.val());
		executeCommand('amendNode', [that.node.cslId, that.node]);
		that.setup();
	});
}