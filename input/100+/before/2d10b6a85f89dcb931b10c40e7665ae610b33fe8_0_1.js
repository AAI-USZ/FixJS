function compress_doclist(list) {
	var kl = {}; var vl = []; var flx = {};
	for(var i=0; i<list.length;i++) {
		var o = list[i];
		var fl = [];
		if(!kl[o.doctype]) { // make key only once # doctype must be first
			var tfl = ['doctype', 'name', 'docstatus', 'owner', 'parent', 'parentfield', 'parenttype', 'idx', 'creation', 'modified', 'modified_by', '__islocal', '__deleted','__newname', '__modified', '_user_tags'];  // for text
			var fl =  ['doctype', 'name', 'docstatus', 'owner', 'parent', 'parentfield', 'parenttype', 'idx', 'creation', 'modified', 'modified_by', '__islocal', '__deleted','__newname', '__modified', '_user_tags'];  // for unique
			
			for(key in wn.meta.docfield_map[o.doctype]) { // all other values
				if(!in_list(fl, key) 
					&& !in_list(no_value_fields, wn.meta.docfield_map[o.doctype][key].fieldtype)
					&& !wn.meta.docfield_map[o.doctype][key].no_column) {
						fl[fl.length] = key; // save value list
						tfl[tfl.length] = key //.replace(/'/g, "\\'").replace(/\n/g, "\\n");
					}
			}
			flx[o.doctype] = fl;
			kl[o.doctype] = tfl
		}
		var nl = [];
		var fl = flx[o.doctype];
		// check all
		for(var j=0;j<fl.length;j++) {
			var v = o[fl[j]];
			nl.push(v);
		}
		vl.push(nl);
	}
		
	return JSON.stringify({'_vl':vl, '_kl':kl});
}