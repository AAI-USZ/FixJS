function(rowData, settings) {
	
	var attributes = '';
	var id = settings.prefix+rowData.name;
	rowData.id = id;
	var value = rowData.value || '';
	rowData.value = value;
	var options = rowData.options;
	
	if (formJs.inputTypes[rowData.type]) {
		var category = formJs.inputTypes[rowData.category];
		var defaults = {
			classes: 'span6'
		};
		
		if (settings.namePrefix)
			rowData.name = settings.namePrefix + rowData.name;
		
		rowData = $.extend(defaults, rowData);
		
		attributes +=  'class="'+rowData.classes+'"';
		attributes += ' data-field-type="'+rowData.type+'"';
		attributes += rowData.mandatory ? ' required' : '';
		attributes += rowData.value ? ' value="'+value+'"' : '';
		attributes += rowData.uniqueIdentifier ? ' data-assetMan-uniqueIdentifier' : '';
		
		var attributesLong = attributes;
		attributesLong += ' id="'+id+'"';
		attributesLong += ' name="'+rowData.name+'"';
		return formJs.inputTypes[rowData.type].generate(attributesLong, id, rowData, settings);
	} else {
		log(rowData, true);
		niceAlert('Error', 'Form.js has encountered an error: unrecognised column type: <em>'+rowData.type+'</em>');
		return false;
	}
}