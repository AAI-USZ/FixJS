function() {
	if((!this.perm[this.df.permlevel]) || (!this.perm[this.df.permlevel][READ]) || 
		this.df.hidden) {
		// no display
		return;
	}

	this.cell = this.frm.layout.addcell(this.df.width);
	$y(this.cell.wrapper, {padding: '8px'});
	_f.cur_col_break_width = this.df.width;

	var fn = this.df.fieldname?this.df.fieldname:this.df.label;
	// header
	if(this.df&&this.df.label){
		this.label = $a(this.cell.wrapper, 'div', '', '', this.df.label);
	}

}