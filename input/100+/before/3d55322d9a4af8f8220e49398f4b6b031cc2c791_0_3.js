function(rowData, settings) {
	
	var attributes = '';
	var id = settings.prefix+'-'+rowData.name;
	rowData.id = id;
	var name = rowData.name;
	var value = rowData.value || '';
	var options = rowData.options;
	
	if (formJs.inputTypes[rowData.type]) {
		var category = formJs.inputTypes[rowData.category];
		
		attributes +=  'class="span6"';
		attributes += ' data-field-type="'+rowData.type+'"';
		attributes += rowData.mandatory ? ' required' : '';
		attributes += rowData.value ? ' value="'+value+'"' : '';
		attributes += rowData.uniqueIdentifier ? ' data-assetMan-uniqueIdentifier' : '';
		
		var attributesLong = attributes;
		attributesLong += ' id="'+id+'"';
		attributesLong += ' name="'+name+'"';
		return formJs.inputTypes[rowData.type].generate(attributesLong, id, rowData);
	} else {
		log(rowData, true);
		niceAlert('Error', 'Form.js has encountered an error: unrecognised column type: <em>'+rowData.type+'</em>');
		return false;
	}
}