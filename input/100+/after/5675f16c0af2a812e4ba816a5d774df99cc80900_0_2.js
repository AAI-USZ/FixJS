function (form) {
		try {
			this.form = form;
		} catch (err) {
			// form_x not found (detailed view perhaps)
			return;
		}
		var e = this.getElement();
		if (!e) {
			return false;
		}
		var evnt = this.lookUp.bind(this);
		
		for (var i = 0; i < this.attached.length; i++) {
			var attached = this.attached[i];
			if (this.eventSetUp.contains(attached)) {
				continue;
			}
			this.eventSetUp.push(attached);
			var element = this.form.formElements.get(attached);
			if (this.options.trigger === '') {
				if (!element) {
					fconsole('autofill - couldnt find element to observe');
				} else {
					var elEvnt = element.getBlurEvent();
					var evnt = this.lookUp.bind(this, attached);
					element.element.removeEvents(elEvnt);
					this.form.dispatchEvent('', attached, elEvnt, evnt);
				}
			} else {
				// @todo trigger in repeat groups to test!
				this.form.dispatchEvent('', this.options.trigger, 'click', evnt);
			}
		}
		
		if (this.options.fillOnLoad && form.options.rowid === '0') {
			var t = this.options.trigger === '' ? this.element.strElement : this.options.trigger;
			this.form.dispatchEvent('', t, 'load', evnt);
		}
	}