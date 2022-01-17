function(doc, cdt, cdn){
	cur_frm.call_server('get_transactions', '', cur_frm.cscript.update_selects);
	
	cur_frm.cscript.select_doc_for_series(doc);
}