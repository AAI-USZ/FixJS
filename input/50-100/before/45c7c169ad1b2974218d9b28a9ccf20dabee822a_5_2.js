function(fields, enable) {
	if(typeof fields=='string') fields = [fields];
	$.each(fields, function(i,f) {
		var field = cur_frm.fields_dict[f];
		if(field) {
			field.disabled = enable ? false : true;
			field.refresh && field.refresh();
		};
	})
}