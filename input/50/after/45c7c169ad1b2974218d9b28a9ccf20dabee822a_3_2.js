function(n, level) {
	var df = wn.meta.get_docfield(cur_frm.doctype, n, cur_frm.docname);
	if(df)df.permlevel = level;
	refresh_field(n);
}