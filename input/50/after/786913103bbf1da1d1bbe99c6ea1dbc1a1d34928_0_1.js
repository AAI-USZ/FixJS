function() {
		var results = this.inherited(arguments);
		this.discoverControlParent();
		return results;
	}