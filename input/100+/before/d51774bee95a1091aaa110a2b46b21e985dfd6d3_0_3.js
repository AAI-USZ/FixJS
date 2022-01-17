function(dt, old, name) {	
	// from form
	if(this.meta.in_dialog) 
		return;
	
	if(this.docname == old)
		this.docname = name;
	else
		return; // thats it, not for children!

	// editable
	this.is_editable[name] = this.is_editable[old];
	delete this.is_editable[old];

	// cleanup
	if(this && this.opendocs[old]) {
		// local doctype copy
		local_dt[dt][name] = local_dt[dt][old];
		local_dt[dt][old] = null;
	}

	delete this.opendocs[old];
	this.opendocs[name] = true;
	
	wn.re_route[window.location.hash] = '#Form/' + encodeURIComponent(this.doctype) + '/' + encodeURIComponent(name);
	wn.set_route('Form', this.doctype, name);
}