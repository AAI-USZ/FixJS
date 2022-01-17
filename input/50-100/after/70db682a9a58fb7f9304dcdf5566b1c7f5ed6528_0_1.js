function(doc, cdt, cdn) {
	if(doc.group_or_ledger=='Ledger') {
		cur_frm.toggle_fields(['tax_rate'], 
			doc.account_type == 'Tax');
		cur_frm.toggle_fields(['master_type', 'master_name'], 
			cstr(doc.account_type)=='');		
	}
}