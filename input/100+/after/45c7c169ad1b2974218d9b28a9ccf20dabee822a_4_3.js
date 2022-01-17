function() {	
	// mandatory
	var to_update = false;
	if(this.df.reqd && this.get_value && is_null(this.get_value())) 
		to_update = true;
		
	if(!to_update && this.df.has_error) this.df.has_error = false;

	if(this.label_icon) this.label_icon.toggle(to_update);
	$(this.txt ? this.txt : this.input).toggleClass('field-to-update', to_update);
	
	$(this.txt ? this.txt : this.input).toggleClass('field-has-error', 
		this.df.has_error ? true : false);
}