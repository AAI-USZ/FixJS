function(doc, cdt, cdn) {
	cur_frm.toggle_fields('account_name', doc.__islocal);
	
	// hide fields if group
	cur_frm.toggle_fields(['account_type', 'master_type', 'master_name', 'freeze_account', 
		'credit_days', 'credit_limit', 'tax_rate'], doc.group_or_ledger=='Ledger')	

	// read-only for root accounts
  	root_acc = ['Application of Funds (Assets)','Expenses','Income','Source of Funds (Liabilities)'];
	if(in_list(root_acc, doc.account_name)) {
		cur_frm.perm = [[1,0,0], [1,0,0]];
		cur_frm.set_intro("This is a root account and cannot be edited.");
	} else {
		// credit days and type if customer or supplier
		cur_frm.set_intro(null);
		cur_frm.toggle_fields(['credit_days', 'credit_limit'], 
			in_list(['Customer', 'Supplier'], doc.master_type))

		// hide tax_rate
		cur_frm.cscript.account_type(doc, cdt, cdn);

		// show / hide convert buttons
		cur_frm.cscript.hide_unhide_group_ledger(doc);		
	}
}