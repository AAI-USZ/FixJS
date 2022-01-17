function(doctype, parent) {
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
	
	// notify on rename
	var me = this;
	$(document).bind('rename', function(event, dt, old_name, new_name) {
		//console.log(arguments)
		if(dt==me.doctype)
			me.rename_notify(dt, old_name, new_name)
	});
}