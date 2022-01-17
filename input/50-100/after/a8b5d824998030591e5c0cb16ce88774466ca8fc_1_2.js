function(from_form) {
	var hidden = 0;
	// we generate section breaks, but hide it based on perms/hidden value
	if((!this.perm[this.df.permlevel]) || (!this.perm[this.df.permlevel][READ]) || this.df.hidden) {
		// no display
		hidden = 1;
	}

	if(hidden) {
		if(this.row)this.row.hide();
	} else {
		if(this.collapsible) {
			//this.section_expand(from_form);
			//if(this.df.reqd || this.has_data()) {
			//	this.section_expand(from_form);
			//} else {
			//	this.section_collapse();
			//}	
		}
	}
}