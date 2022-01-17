function(n) {
	if(typeof n == 'string') n = [n];
	for(var i in n) cur_frm.set_df_property(n, 'hidden', 0);
}