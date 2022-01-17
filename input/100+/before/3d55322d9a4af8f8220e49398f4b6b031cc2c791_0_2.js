function(rowData, settings) {
	if (rowData.type == 'HIDDEN')
		return formJs.makeInput(rowData, settings);
	var row = $('<div class="control-group"></div>');
		row.append('<label class="control-label" for="'+settings.prefix+'-'+rowData.name+'"><span class="formJs-name">'+rowData.label+'</span>'+(rowData.mandatory ? '<span class="mandatory">*</span>' : '')+'</label>');
		var controls = $('<div class="controls">');
		controls.append(formJs.makeInput(rowData, settings));
		row.append(controls);
		row = formJs.addAttributes(row, rowData);
	return row;
}