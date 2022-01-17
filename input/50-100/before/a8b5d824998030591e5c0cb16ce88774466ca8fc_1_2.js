function(from_form) {
	if(this.df.hidden) {
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