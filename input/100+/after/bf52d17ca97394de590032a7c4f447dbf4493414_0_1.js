function(auto_run) {
		var me = this;
		// init list
		this.make({
			method: 'webnotes.widgets.doclistview.get',
			get_args: this.get_args,
			parent: this.wrapper,
			start: 0,
			page_length: this.page_length,
			show_filters: true,
			show_grid: true,
			new_doctype: this.doctype,
			allow_delete: this.allow_delete,
			no_result_message: this.make_no_result(),
			columns: this.listview.fields
		});
		
		// make_new_doc can be overridden so that default values can be prefilled
		// for example - communication list in customer
		$(this.wrapper).find('button[list_view_doc="'+me.doctype+'"]').click(function(){
			me.make_new_doc(me.doctype);
		});
		
		if((auto_run !== false) && (auto_run !== 0)) this.run();
	}