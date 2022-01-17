function(n, txt) {
	var df = get_field(cur_frm.doctype, n, cur_frm.docname);
	if(df)df.options = txt;
	refresh_field(n);
}