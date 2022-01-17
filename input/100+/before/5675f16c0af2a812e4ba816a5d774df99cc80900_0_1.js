function (options) {
		this.setOptions(options);
		this.attached = [];
		this.eventSetUp = [];
		/*if (Browser.ie) {
			this.setUp(Fabrik.blocks['form_' + this.options.formid]);
		} else {
			Fabrik.addEvent('fabrik.form.elements.added', function (form) {
				this.setUp(form);	
			}.bind(this));
		}*/
		
		Fabrik.addEvent('fabrik.form.elements.added', function (form) {
			this.setUp(form);	
		}.bind(this));
		
		Fabrik.addEvent('fabrik.form.element.added', function (form, elId, oEl) {
			if (!this.element) {
				//if we are on the form load then this.element not set so return
				return;
			}
			// a group has been duplicated
			if (oEl.strElement === this.element.strElement) {
				// the element is a clone of our observable element
				this.element = false;
				this.setUp(form);
			}
		}.bind(this));
	}