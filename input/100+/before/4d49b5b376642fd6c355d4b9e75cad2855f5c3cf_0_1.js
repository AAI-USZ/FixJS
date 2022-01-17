function(doc) {
	var doctype = doc.doctype;
	var docfields = wn.meta.docfield_list[doctype];
	if(!docfields) {
		return;
	}
	var fields_to_refresh = [];
	for(var fid=0;fid<docfields.length;fid++) {
		var f = docfields[fid];
		if(!in_list(no_value_fields, f.fieldtype) && doc[f.fieldname]==null) {
			var v = LocalDB.get_default_value(f.fieldname, f.fieldtype, f['default']);
			if(v) {
				doc[f.fieldname] = v;
				fields_to_refresh.push(f.fieldname);
			}
		}
	}
	return fields_to_refresh;
}