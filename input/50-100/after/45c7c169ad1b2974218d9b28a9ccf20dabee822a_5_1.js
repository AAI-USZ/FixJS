function(fnames, fn) {
	if(typeof fnames=='string') fnames = [fnames];
	$.each(fnames, function(i,f) {
		//var field = cur_frm.fields_dict[f]; - much better design
		var field = wn.meta.get_docfield(cur_frm.doctype, f, cur_frm.docname)
		if(field) {
			fn(field);
			field.refresh && field.refresh();
		};
	})
	
}