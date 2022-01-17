function(layout) {
	//if(!this.cell)return; // no perm
	
	var hidden = 0;
	// we generate column breaks, but hide it based on perms/hidden value
	if((!this.perm[this.df.permlevel]) || (!this.perm[this.df.permlevel][READ]) || 
		this.df.hidden) {
		// do not display, as no permission
		hidden = 1;
	}
	
	// hidden
	if(this.set_hidden!=hidden) {
		if(hidden)
			this.cell.hide();
		else
			this.cell.show();
		this.set_hidden = hidden;
	}
}