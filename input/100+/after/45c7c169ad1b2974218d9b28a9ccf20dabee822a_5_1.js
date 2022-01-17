function() {
	this.page_layout = new wn.PageLayout({
		parent: this.wrapper,
		main_width: (this.meta.in_dialog && !this.in_form) ? '100%' : '75%',
		sidebar_width: (this.meta.in_dialog && !this.in_form) ? '0%' : '25%'
	})	
			
	// only tray
	this.meta.section_style='Simple'; // always simple!
	
	// layout
	this.layout = new Layout(this.page_layout.body, '100%');
	
	// sidebar
	if(this.meta.in_dialog && !this.in_form) {
		// hide sidebar
		$(this.page_layout.wrapper).removeClass('layout-wrapper-background');
		$(this.page_layout.main).removeClass('layout-main-section');
		$(this.page_layout.sidebar_area).toggle(false);
	} else {
		// module link
		this.setup_sidebar();
	}
		
	// footer
	this.setup_footer();
	
		
	// header - no headers for tables and guests
	if(!(this.meta.istable || user=='Guest' || (this.meta.in_dialog && !this.in_form))) 
		this.frm_head = new _f.FrmHeader(this.page_layout.head, this);
			
	// create fields
	this.setup_fields_std();
}