function (attributeName, schemaAttribute, index) {
		var attribute,
			schemaValues,
			dropdownValues,
			dropdownDocumentation,
			valueIndex,
			thisRow,
			multiInput,
			intValue,
			value;

		attribute = null;

		$.each(nodeData.attributes, function (i, thisAttribute) {
			var existingAttributeIndex;
			
			if (thisAttribute.key === attributeName &&
				isValidValue(thisAttribute.value, schemaAttribute)) {

				// do deep copy if one already exists
				existingAttributeIndex = indexOfAttribute(attributeName, newAttributes);
				if (existingAttributeIndex !== -1) {
					attribute = {
						key : thisAttribute.key,
						value : thisAttribute.value,
						enabled : thisAttribute.enabled
					};
				} else {
					attribute = thisAttribute;
				}
				
				if (!("enabled" in attribute)) {
					attribute["enabled"] = true;
				}
			}
		});
		if (attribute === null) {
			if (!schemaAttribute.hasOwnProperty("defaultValue")) {
				value = "";
			} else {
				value = schemaAttribute.defaultValue;
			}
			// create attribute if it doesn't exist
			attribute = { key : attributeName, value : value, enabled : false };
		}

		newAttributes.push(attribute);

		if (typeof checkboxControlSchema[attributeName] !== "undefined") {
			createButton(attributeName, schemaAttribute, index, attribute);
			return;
		}

		schemaValues = schemaAttribute.values;
		dropdownValues = [];
		dropdownDocumentation = {};

		// add macro dropdown values, they aren't in the schema
		if (attributeName === "macro") {
			$.each(CSLEDIT.data.getNodesFromPath("style/macro"), function (i, node) {
				dropdownValues.push(node.attributes[indexOfAttribute("name", node.attributes)].value);
			});
		}

		if (schemaValues.length > 0) {
			for (valueIndex = 0; valueIndex < schemaValues.length; valueIndex++) {
				switch (schemaValues[valueIndex].type) {
				case "novalue":
					dropdownValues.push(schemaValues[valueIndex].value);
					dropdownDocumentation[schemaValues[valueIndex].value] =
						schemaValues[valueIndex].documentation;
					break;
				case "value":
					dropdownValues.push(schemaValues[valueIndex].value);
					if (schemaValues[valueIndex].documention !== "") {
						dropdownDocumentation[schemaValues[valueIndex].value] =
							schemaValues[valueIndex].documentation;
					}
					break;
				case "data":
					switch (schemaValues[valueIndex].value) {
					case "boolean":
						dropdownValues.push("true");
						dropdownValues.push("false");
						break;
					case "integer":
						for (intValue = 0; intValue < 20; intValue++) {							
							dropdownValues.push(intValue);
						}
						break;
					case "language":
						/*
						dropdownValues.push("English");
						dropdownValues.push("etc... ");
						dropdownValues.push("(TODO: find proper list");*/
						break;
					default:
						console.log("WARNING: data type not recognised: " + 
							schemaValues[valueIndex].type);
					}
					break;
				default:
					assert(false, "attribute value type not recognised");
				}
			}
		}

		if (dropdownValues.length === 1) {
			// if only 1 one value is possible, put it in a label
			thisRow = $('<tr/>');
			thisRow.append($('<td/>').append(label(index, attributeName)));
			thisRow.append($('<td/>').append(
				'<label id="nodeAttribute' + index + '">' + dropdownValues[0] + '</label>'));
		} else if (dropdownValues.length > 1) {
			thisRow = $('<tr></tr>');
			thisRow.append($('<td></td>').append(label(index, attributeName)));
			if (schemaAttribute.list) {
				multiInput = new CSLEDIT.MultiComboBox(
						$('<td class="input"></td>'), dropdownValues, function() {nodeChanged();});
				multiInput.val(attribute.value, true);
				
				if (!attribute.enabled && !schemaAttribute.hasOwnProperty("defaultValue")) {
					multiInput.getElement().attr("disabled", true);
				}
				thisRow.append(multiInput.getElement());
				multiInputs[index] = multiInput;
			} else {
				thisRow.append((function () {
					var select, cell;
					select = $('<select id="' + inputId(index) + '" class="propertySelect" attr="' + 
						index + '"></select>');

					$.each(dropdownValues, function (i, value) {
						var option = $("<option>" + value + "</option>");
						if (value in dropdownDocumentation) {
							option.attr("title", dropdownDocumentation[value]);
						}
						select.append(option);
					});

					cell = $('<td class="input"></td>').append(select)
					if (!attribute.enabled && !schemaAttribute.hasOwnProperty("defaultValue")) {
						cell.attr('disabled', true);
					}
					
					return cell;
				}()));
			}
		} else {
			thisRow = inputAttributeRow(index, attributeName, schemaAttribute, attribute.enabled);
		}

		var toggleButton;

		if (!schemaAttribute.hasOwnProperty("defaultValue")) {
			toggleButton = $('<button class="toggleAttrButton" attrIndex="' + index + '"></button>');
			if (attribute.enabled) {
				toggleButton.html('Disable');
			} else {
				toggleButton.html('Enable');
			}
			thisRow.append($('<td></td>').append(toggleButton));
		}
		thisRow.find("#" + inputId(index)).val(attribute.value);
			
		if (schemaAttribute.documentation !== "") {
			thisRow.attr('title', schemaAttribute.documentation);
		}

		return thisRow;
	}