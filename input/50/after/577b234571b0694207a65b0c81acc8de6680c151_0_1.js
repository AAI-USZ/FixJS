function(checkBoxId, componentId, type) {
	var value = jQuery('#' + checkBoxId).attr('checked') == 'checked';
	PropertyManager.saveComponentProperty(componentId, type, value, currentCallback);
}