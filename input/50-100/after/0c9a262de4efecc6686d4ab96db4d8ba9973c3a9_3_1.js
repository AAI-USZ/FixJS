function(r) {
	set_field_options('select_doc_for_series', r.message.transactions);
	set_field_options('prefix', r.message.prefixes);
}