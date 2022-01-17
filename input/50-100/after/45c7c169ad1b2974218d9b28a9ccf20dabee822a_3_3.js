function _hide_field(n,hidden) {
		var df = wn.meta.get_docfield(cur_frm.doctype, n, cur_frm.docname);
		if(df) {df.hidden = hidden; refresh_field(n); }
		else { console.log("unhide_field cannot find field " + n); }
	}