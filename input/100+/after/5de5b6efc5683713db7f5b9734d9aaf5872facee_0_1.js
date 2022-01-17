function check_required(dt, dn, parent_dt) {
	var doc = locals[dt][dn];
	if(doc.docstatus>1)return true;
	var fl = wn.meta.docfield_list[dt];
	
	if(!fl)return true; // no doctype loaded
	
	var all_clear = true;
	var errfld = [];
	for(var i=0;i<fl.length;i++) {
		var key = fl[i].fieldname;
		var v = doc[key];
		
		if(fl[i].fieldtype=='Table') {
			var no_value = true;
			$.each(locals[fl[i].options], function(k,d) {
				if(d.parent==doc.name && d.parenttype==doc.doctype && d.parentfield==fl[i].fieldname) {
					no_value = false;
				}
			});
		} else {
			var no_value = is_null(v);			
		}
				
		if(fl[i].reqd && no_value && fl[i].fieldname) {
			errfld[errfld.length] = fl[i].label;
			
			// Bring to front "Section"
			if(cur_frm) {
				// show as red
				var f = cur_frm.fields_dict[fl[i].fieldname];
				if(f) {
					// in form
					if(f.set_as_error) f.set_as_error(1);
					
					// switch to section
					if(!cur_frm.error_in_section && f.parent_section) {
						cur_frm.error_in_section = 1;
					}
				}
			}
						
			if(all_clear)all_clear = false;
		}
	}
	if(errfld.length)msgprint('<b>Mandatory fields required in '+
	 	(doc.parenttype ? (wn.meta.docfield_map[doc.parenttype][doc.parentfield].label + ' (Table)') : get_doctype_label(doc.doctype)) +
		':</b>\n' + errfld.join('\n'));
	return all_clear;
}