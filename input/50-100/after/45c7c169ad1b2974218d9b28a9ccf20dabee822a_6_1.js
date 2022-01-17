function(hc) {
	hc.template = make_field(wn.meta.get_docfield(hc.doctype, hc.fieldname), hc.doctype, '', this.field.frm, true);
	hc.template.grid = this;
}