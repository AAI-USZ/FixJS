function(element) {
		module.FormDialog.call(this, element);
		
		window.fileForm = this;
		
		this.id = _ID;
		this.modal = false;
		this.indicator = this.element.find("span.indicator");
		this.fragment = null;		// target fragment widget to be updated
		this.onSaved = null;
	}