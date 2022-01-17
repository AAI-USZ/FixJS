function(element, event) {
		this.lastActive = element;
	
		// hide error label and remove error class on focus if enabled
		if ( this.settings.focusCleanup && !this.blockFocusCleanup ) {
			if ( this.settings.unhighlight ) {
				this.settings.unhighlight.call( this, element, this.settings.errorClass, this.settings.validClass, this._defaults.unhighlight );
			}
			this.addWrapper(this.errorsFor(element)).hide();
		}
	}