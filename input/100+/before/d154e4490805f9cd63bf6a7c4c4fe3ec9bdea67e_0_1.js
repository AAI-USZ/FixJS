function (element, node, executeCommand) {
	var that = this;

	this.element = element;
	this.node = new CSLEDIT.CslNode(node);
	this.node.children = []; // not interested in the children

	// any / none / all selector
	this.matchSelect = $('<select></select>');
	$.each(CSLEDIT.schema.attributes('choose/if').match.values, function (i, value) {
		that.matchSelect.append('<option>' + value.value + '</option>');
	});

	// generate mainOptions from the schema
	this.mainOptions = {};
	$.each(this.attributeUi, function (attribute, ui) {
		var mainOptionProperties = that.mainOptions[ui.mainOption] || [];
		
		mainOptionProperties.push({
			attribute: attribute,
			subOption: ui.subOption
		});
		that.mainOptions[ui.mainOption] = mainOptionProperties;
	});

	// mainOption selector (document type / variable / date / locator / ...)
	this.mainOptionSelect = $('<select></select>');
	$.each(this.mainOptions, function (mainOption, properties) {
		that.mainOptionSelect.append('<option>' + mainOption + '</option>');
	});

	this.setup();
}