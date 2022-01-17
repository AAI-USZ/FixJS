function(doc, cdt, cdn) {
	return 'SELECT `tabAccount`.name FROM `tabAccount` WHERE `tabAccount`.is_pl_account = "No" AND `tabAccount`.debit_or_credit = "Credit" AND `tabAccount`.company = "'+ cstr(doc.company) +'" AND ifnull(`tabAccount`.freeze_account, "No") = "No" AND `tabAccount`.group_or_ledger = "Ledger" AND `tabAccount`.%(key)s LIKE "%s" ORDER BY `tabAccount`.name ASC LIMIT 50';
}