function(doc, cdt, cdn) {
	// read-only for root accounts
  	root_acc = ['Application of Funds (Assets)','Expenses','Income','Source of Funds (Liabilities)'];
	if(inList(root_acc, doc.account_name))
		cur_frm.perm = [[1,0,0], [1,0,0]];

	// hide fields if group
	cur_frm.toggle_fields(['account_type', 'master_type', 'master_name', 'freeze_account', 
		'credit_days', 'credit_limit'], doc.group_or_ledger=='Ledger')	

	// credit days and type if customer or supplier
	cur_frm.toggle_fields(['credit_days', 'credit_limit'], 
		in_list(['Customer', 'Supplier'], doc.master_type))

	// hide tax_rate
	cur_frm.cscript.account_type(doc, cdt, cdn);

	// show / hide convert buttons
	cur_frm.cscript.hide_unhide_group_ledger(doc);
	
	// back to chart of accounts
	cur_frm.add_custom_button('Back To Chart of Accounts', function() {
		wn.set_route('Accounts Browser', 'Account');
	}, 'icon-arrow-left')
	
}