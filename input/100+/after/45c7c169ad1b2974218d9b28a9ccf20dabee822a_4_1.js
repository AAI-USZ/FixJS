function() { 
	var ischk = (this.df.fieldtype=='Check' ? 1 : 0);
	
	// parent element
	if(this.parent)
		this.wrapper = $a(this.parent, (this.with_label ? 'div' : 'span'));
	else
		this.wrapper = document.createElement((this.with_label ? 'div' : 'span'));

	this.label_area = $a(this.wrapper, 'div', '', {margin:'0px 0px 2px 0px', minHeight:'1em'});

	if(ischk && !this.in_grid) {
		this.input_area = $a(this.label_area, 'span', '', {marginRight:'4px'});
		this.disp_area = $a(this.label_area, 'span', '', {marginRight:'4px'});
	}
	
	// label
	if(this.with_label) {	
		this.label_span = $a(this.label_area, 'span', 'small', {cssFloat:'left'})
	
		// error icon
		this.label_icon = $('<i class="icon icon-warning-sign">').toggle(false)
			.appendTo(this.label_area).css('float','left').css('margin-left','7px')
			.attr("title", "This field is mandatory.");

		// error icon
		this.suggest_icon = $('<i class="icon icon-chevron-down">').toggle(false)
			.appendTo(this.label_area).css('float','left').css('margin-left','7px')
			.attr("title", "will show suggestions as you type.");

	} else {
		this.label_span = $a(this.label_area, 'span', '', {marginRight:'4px'})
		$dh(this.label_area);
	}

	// make the input areas
	if(!this.input_area) {
		this.input_area = $a(this.wrapper, (this.with_label ? 'div' : 'span'));
		this.disp_area = $a(this.wrapper, (this.with_label ? 'div' : 'span'));
	}

	// apply style
	if(this.in_grid) { 
		if(this.label_area) $dh(this.label_area);
	} else {
		this.input_area.className = 'input_area';
		$y(this.wrapper,{marginBottom:'9px'});
		
		// set description
		this.set_description();	
	}
	
	// bind label refresh

	if(this.onmake)this.onmake();
}