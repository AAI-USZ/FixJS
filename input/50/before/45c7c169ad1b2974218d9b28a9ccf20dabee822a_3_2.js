function(n, level) {
	var df = get_field(cur_frm.doctype, n, cur_frm.docname);
	if(df)df.permlevel = level;
	refresh_field(n);
}