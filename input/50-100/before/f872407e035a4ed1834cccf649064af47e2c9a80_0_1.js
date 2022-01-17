function(tabs, properties, before) {
		for (var i = 0; i < tabs.length; i++)
			tabs[i].ungroup(true);
		
		return this._create(tabs, properties, before);
	}