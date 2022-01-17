function(doc, cdt, cdn) {
	if(!doc.__islocal) {
		get_field(doc.doctype, 'new_item_code', doc.name).permlevel = 1;
	}
}