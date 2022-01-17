function(doc, dt, dn) {
	if (doc.convert_into_recurring_invoice)
		get_server_fields('set_default_recurring_values','','',doc, dt, dn, 0);
}