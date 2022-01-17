function(doctype, parent, in_form) {
	this.docname = '';
	this.doctype = doctype;
	this.display = 0;
		
	var me = this;
	this.is_editable = {};
	this.opendocs = {};
	this.sections = [];
	this.grids = [];
	this.cscript = {};
	this.pformat = {};
	this.fetch_dict = {};
	this.parent = parent;
	this.tinymce_id_list = [];
	
	this.setup_meta(doctype);
	
	// show in form instead of in dialog, when called using url (router.js)
	this.in_form = in_form ? true : false;
	
	// notify on rename
	var me = this;
	$(document).bind('rename', function(event, dt, old_name, new_name) {
		//console.log(arguments)
		if(dt==me.doctype)
			me.rename_notify(dt, old_name, new_name)
	});
}