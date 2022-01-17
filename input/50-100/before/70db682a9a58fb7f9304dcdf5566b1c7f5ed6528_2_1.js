function(doc, cdt, cdn) {
	cur_frm.cscript.hide_unhide_group_ledger(doc);
	cur_frm.add_custom_button('Back To Chart of Cost Centers', function() {
		wn.set_route('Accounts Browser', 'Cost Center');
	}, 'icon-arrow-left')

	var intro_txt = '';
	if(!doc.__islocal && doc.group_or_ledger=='Group') {
		intro_txt += '<p><b>Note:</b> This is Cost Center is a <i>Group</i>, \
			Accounting Entries are not allowed against groups.</p>';
	}
	cur_frm.set_intro(intro_txt);
}