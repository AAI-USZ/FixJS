function _hide_field(n,hidden) {
		var df = get_field(cur_frm.doctype, n, cur_frm.docname);
		if(df) { df.hidden = hidden; refresh_field(n); }
		else { console.log("hide_field cannot find field " + n); }
	}