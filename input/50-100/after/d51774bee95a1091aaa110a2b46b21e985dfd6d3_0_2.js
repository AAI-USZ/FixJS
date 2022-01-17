function() {
	// set title
	// main title
	if(!this.meta.in_dialog || this.in_form) {
		set_title(this.meta.issingle ? this.doctype : this.docname);
	}	
	
	// form title
	//this.page_layout.main_head.innerHTML = '<h2>'+this.docname+'</h2>';

	// show / hide buttons
	if(this.frm_head)this.frm_head.refresh();
	
	// add to recent
	if(wn.ui.toolbar.recent) 
		wn.ui.toolbar.recent.add(this.doctype, this.docname, 1);	
}