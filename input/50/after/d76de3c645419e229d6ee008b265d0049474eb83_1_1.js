function() {
		this.inherited(arguments);
		if (this.floating) {
			this.setParent(enyo.floatingLayer);
		}
	}