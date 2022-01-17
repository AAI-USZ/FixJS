function(n, txt) {
	var df = wn.meta.get_docfield(cur_frm.doctype, n, cur_frm.docname);
	if(df)df.options = txt;
	refresh_field(n);
}