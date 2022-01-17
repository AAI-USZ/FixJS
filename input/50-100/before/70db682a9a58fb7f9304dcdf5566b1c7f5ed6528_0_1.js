function(doc, cdt, cdn) {
	cur_frm.toggle_fields(['tax_rate'], doc.account_type == 'Tax')
	cur_frm.toggle_fields(['master_type', 'master_name'], cstr(doc.account_type)=='')
}