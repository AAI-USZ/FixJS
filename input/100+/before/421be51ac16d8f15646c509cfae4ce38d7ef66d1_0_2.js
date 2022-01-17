function (event) {
		var target = $(event.target),
			attribute = target.attr('data-attribute'),
			value,
			index = indexOfAttribute(attribute, nodeData.attributes),
			siblingControls = $(event.target).siblings('[data-attribute="' + attribute + '"]');
		
		// disable any other buttons for this attribute
		siblingControls.removeAttr('checked').button('refresh');

		if (target.is(':checked')) {
			value = target.attr('data-value');
		} else {
			value = defaultValueForCustomControl(attribute);
		}

		nodeData.attributes[index] = {
			key : attribute,
			value : value,
			enabled : true
		}

		executeCommand("amendNode", [nodeData.cslId, stripChildren(nodeData)]);
	}