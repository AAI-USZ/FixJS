function (element, node, executeCommand) {
	var that = this;

	this.element = element;
	this.node = new CSLEDIT.CslNode(node);
	this.node.children = []; // not interested in the children
	this.executeCommand = executeCommand;

	this.conditions = []; // the 'model' for this view

	// any / none / all selector
	this.matchSelect = $('<select></select>');
	$.each(CSLEDIT.schema.attributes('choose/if').match.values, function (i, value) {
		that.matchSelect.append('<option>' + value.value + '</option>');
	});

	// generate mainOptions from the schema
	this.mainOptions = {};
	$.each(this.attributeUI, function (attribute, ui) {
		var mainOptionProperties = that.mainOptions[ui.mainOption] || [];
		
		mainOptionProperties.push({
			attribute: attribute,
			subOption: ui.subOption
		});
		that.mainOptions[ui.mainOption] = mainOptionProperties;
	});

	this.setup();
}