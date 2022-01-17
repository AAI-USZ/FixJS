function(doc) {
	// make sensitive fields(has_serial_no, is_stock_item, valuation_method)
	// read only if any stock ledger entry exists

	if ((!doc.__islocal) && (doc.is_stock_item == 'Yes')) {
		var callback = function(r, rt) {
			if (r.message == 'exists') permlevel = 1;
			else permlevel = 0;

			set_field_permlevel('has_serial_no', permlevel);
			set_field_permlevel('is_stock_item', permlevel);
			set_field_permlevel('valuation_method', permlevel);
		}
		$c_obj(make_doclist(doc.doctype, doc.name),'check_if_sle_exists','',callback);
	}
}