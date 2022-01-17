function(name) {
		if (!this.views.hasOwnProperty(name)) throw "View '" + name + '" not found';
		return this.views[name];
	}