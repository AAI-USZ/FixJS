function(hc) {
	hc.template = make_field(get_field(hc.doctype, hc.fieldname), hc.doctype, '', this.field.frm, true);
	hc.template.grid = this;
}