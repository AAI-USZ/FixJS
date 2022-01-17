function() {
	// refresh fields
	for(var i=0; i<this.fields.length; i++) {
		var f = this.fields[i];
		f.perm = this.perm;
		f.docname = this.docname;
		
		// if field is identifiable (not blank section or column break)
		// get the "customizable" parameters for this record
		var fn = f.df.fieldname || f.df.label;
		if(fn)
			f.df = get_field(this.doctype, fn, this.docname);
			
		if(f.df.fieldtype!='Section Break' && f.refresh) {
			f.refresh();			
		}
	}

	// refresh sections
	$.each(this.sections, function(i, f) {
		f.refresh(true);
	})

	// cleanup activities after refresh
	this.cleanup_refresh(this);
}