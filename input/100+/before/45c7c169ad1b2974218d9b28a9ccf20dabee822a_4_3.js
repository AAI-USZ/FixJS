function() {	
	// mandatory
	if(this.df.reqd) {
		if(this.get_value && is_null(this.get_value())) {
		 	if(this.label_icon) $ds(this.label_icon);
			$(this.txt ? this.txt : this.input).addClass('field-to-update')
		} else {
		 	if(this.label_icon) $dh(this.label_icon);
			$(this.txt ? this.txt : this.input).removeClass('field-to-update')
		}
	}
}