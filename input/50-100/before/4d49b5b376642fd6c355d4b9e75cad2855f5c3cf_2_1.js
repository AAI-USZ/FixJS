function() { 
	if(this.in_filter)return;

	// mandatory changes
	if(this.df.reqd) {
		if(this.label_area) this.label_area.style.color= "#d22";
		this.set_style_mandatory(1);
	} else {
		if(this.label_area) this.label_area.style.color= "#222";
		this.set_style_mandatory(0);

	}
	
	this.refresh_label_icon()
	this.set_reqd = this.df.reqd;
}