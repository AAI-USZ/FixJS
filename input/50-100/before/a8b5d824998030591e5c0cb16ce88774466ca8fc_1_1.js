function(layout) {
	if(!this.cell)return; // no perm
	
	// hidden
	if(this.set_hidden!=this.df.hidden) {
		if(this.df.hidden)
			this.cell.hide();
		else
			this.cell.show();
		this.set_hidden = this.df.hidden;
	}
}