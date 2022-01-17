function(name) {
		if (name == 'ui-view') return this;
		if (!this.views.hasOwnProperty(name)) throw "View '" + name + '" not found';
		return this.views[name];
	}