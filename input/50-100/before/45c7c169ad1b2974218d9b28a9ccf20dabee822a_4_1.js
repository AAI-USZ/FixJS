function() {
	// update mandatory icon
	this.refresh_label_icon();

	if(this.df.reqd && this.get_value && !is_null(this.get_value()) && this.set_as_error)
		this.set_as_error(0);

	if(this.not_in_form) {
		return;
	}

	if(cur_frm.cscript[this.df.fieldname])
		cur_frm.runclientscript(this.df.fieldname, this.doctype, this.docname);

	cur_frm.refresh_dependency();
}