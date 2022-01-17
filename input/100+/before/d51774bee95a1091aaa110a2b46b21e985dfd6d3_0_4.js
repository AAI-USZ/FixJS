function(docname) {
	// record switch
	if(docname) {
		if(this.docname != docname && !this.meta.in_dialog && !this.meta.istable) scroll(0, 0);
		this.docname = docname;
	}
	if(!this.meta.istable) {
		cur_frm = this;
		this.parent.cur_frm = this;
	}
			
	if(this.docname) { // document to show

		// check permissions
		if(!this.check_doc_perm()) return;

		// do setup
		if(!this.setup_done) this.setup();

		// set customized permissions for this record
		this.runclientscript('set_perm',this.doctype, this.docname);

		// set the doc
		this.doc = get_local(this.doctype, this.docname);	  
		
		// load the record for the first time, if not loaded (call 'onload')
		cur_frm.cscript.is_onload = false;
		if(!this.opendocs[this.docname]) { 
			cur_frm.cscript.is_onload = true;
			this.setnewdoc(this.docname); 
		}

		// editable
		if(this.doc.__islocal) 
			this.is_editable[this.docname] = 1; // new is editable

		this.editable = this.is_editable[this.docname];
		
		if(!this.doc.__archived && (this.editable || (!this.editable && this.meta.istable))) {
			// show form layout (with fields etc)
			// ----------------------------------
			if(this.print_wrapper) {
				$dh(this.print_wrapper);
				$ds(this.page_layout.wrapper);
			}

			// header
			if(!this.meta.istable) { 
				this.refresh_header();
				this.sidebar && this.sidebar.refresh();
			}
		
			// call trigger
	 		this.runclientscript('refresh');
			
			// trigger global trigger
			// to use this
			// $(docuemnt).bind('form_refresh', function() { })
			$(document).trigger('form_refresh');
						
			// fields
			this.refresh_fields();
			
			// dependent fields
			this.refresh_dependency();

			// footer
			this.refresh_footer();
			
			// layout
			if(this.layout) this.layout.show();

			// call onload post render for callbacks to be fired
			if(cur_frm.cscript.is_onload) {
				this.runclientscript('onload_post_render', this.doctype, this.docname);
			}
				
			// focus on first input
			
			if(this.doc.docstatus==0) {
				$(this.wrapper).find('.form-layout-row :input:first').focus();
			}
		
		} else {
			// show print layout
			// ----------------------------------
			this.refresh_header();
			if(this.print_wrapper) {
				this.refresh_print_layout();
			}
			this.runclientscript('edit_status_changed');
		}

		$(cur_frm.wrapper).trigger('render_complete');
	} 
}