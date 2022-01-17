function(checkBoxId, componentId, type, event) {
	var value = jQuery('#' + checkBoxId).attr('checked') == 'checked';
	//saveComponentProperty(componentId, type, value, event);
	PropertyManager.saveComponentProperty(componentId, type, value, currentCallback);
}