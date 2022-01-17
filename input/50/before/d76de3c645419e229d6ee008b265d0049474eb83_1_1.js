function() {
		this.inherited(arguments);
		if (this.floating) {
			this.setParent(onyx.floatingLayer);
		}
	}