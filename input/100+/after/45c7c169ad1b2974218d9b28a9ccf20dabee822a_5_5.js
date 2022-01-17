function(onload, from_amend) {
	
	if(!this.perm[0][CREATE]) {
		msgprint('You are not allowed to create '+this.meta.name);
		return;
	}
	
	var dn = this.docname;
	// copy parent
	var newdoc = LocalDB.copy(this.doctype, dn, from_amend);

	// do not copy attachments
	if(this.meta.allow_attach && newdoc.file_list && !from_amend)
		newdoc.file_list = null;
	
	// copy chidren
	var dl = make_doclist(this.doctype, dn);

	// table fields dict - for no_copy check
	var tf_dict = {};

	for(var d in dl) {
		d1 = dl[d];
		
		// get tabel field
		if(!tf_dict[d1.parentfield]) {
			tf_dict[d1.parentfield] = wn.meta.get_docfield(d1.parenttype, d1.parentfield);
		}
		
		if(d1.parent==dn && cint(tf_dict[d1.parentfield].no_copy)!=1) {
			var ch = LocalDB.copy(d1.doctype, d1.name, from_amend);
			ch.parent = newdoc.name;
			ch.docstatus = 0;
			ch.owner = user;
			ch.creation = '';
			ch.modified_by = user;
			ch.modified = '';
		}
	}

	newdoc.__islocal = 1;
	newdoc.docstatus = 0;
	newdoc.owner = user;
	newdoc.creation = '';
	newdoc.modified_by = user;
	newdoc.modified = '';

	if(onload)onload(newdoc);

	loaddoc(newdoc.doctype, newdoc.name);
}