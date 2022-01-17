function(n) {
	function _hide_field(n,hidden) {
		cur_frm.set_df_property(n, 'hidden', hidden)
	}	
	if(cur_frm) {
		if(typeof n == 'string') _hide_field(n,1);
		else { for(var i in n)_hide_field(n[i],1) }
	}
}