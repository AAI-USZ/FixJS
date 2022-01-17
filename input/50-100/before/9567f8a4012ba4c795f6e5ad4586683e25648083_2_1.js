function() {
		var that = this;
		enyo.log('on main create');
		this.inherited(arguments);
		this.items = [];
		this.origItems = [];
		this.fetch('HOT');
		//this.$.mediaList.renderViews(5);
		//this.index = 1;
		this.index = 0;
	}