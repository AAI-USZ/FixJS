function (index) {
	var attribute = that.conditions[index].attribute;

	// update conditions
	that.conditions.splice(index, 1);

	// update view
	that.mainOptionControls.length = that.conditions.length;
	that.subOptionControls.length = that.conditions.length;
	that.valueControls.length = that.conditions.length;

	for (i = index; i < that.conditions.length; i++) {
		that.createConditionControls(i, that.conditions[i]);
	}

	that.refresh();

	// update value
	that.node.setAttr(that.attributeValue(attribute));
	that.executeCommand('amendNode', [that.node.cslId, that.node]);
}