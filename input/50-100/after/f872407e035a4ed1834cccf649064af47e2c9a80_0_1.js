function(properties, before) {
		if (properties.focused)
			return this._create(properties, before);
		
		var currentTab = ext.tabs.getSelected();
		properties.focused = true;
		var retval = this.create(properties, before);
		if (currentTab)
			currentTab.focus();
		return retval;
	}