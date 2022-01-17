function() { 
	var ischk = (this.df.fieldtype=='Check' ? 1 : 0);
	
	// parent element
	if(this.parent)
		this.wrapper = $a(this.parent, (this.with_label ? 'div' : 'span'));
	else
		this.wrapper = document.createElement((this.with_label ? 'div' : 'span'));

	this.label_area = $a(this.wrapper, 'div', '', {margin:'0px 0px 2px 0px'});

	if(ischk && !this.in_grid) {
		this.input_area = $a(this.label_area, 'span', '', {marginRight:'4px'});
		this.disp_area = $a(this.label_area, 'span', '', {marginRight:'4px'});
	}
	
	// label
	if(this.with_label) {	
		this.label_span = $a(this.label_area, 'span', 'small')
	
		// error icon
		this.label_icon = $a(this.label_area,'img','',{margin:'-3px 4px -3px 4px'}); $dh(this.label_icon);
		this.label_icon.src = 'images/lib/icons/error.gif';
		this.label_icon.title = 'Mandatory value needs to be entered';

		// error icon
		this.suggest_icon = $a(this.label_area,'img','',{margin:'-3px 4px -3px 0px'}); $dh(this.suggest_icon);
		this.suggest_icon.src = 'images/lib/icons/bullet_arrow_down.png';
		this.suggest_icon.title = 'With suggestions';

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