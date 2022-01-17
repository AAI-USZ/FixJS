function() {
		var that = this;
		enyo.log('on main create');
		this.inherited(arguments);
		this.items = [];
		this.origItems = [];
		this.fetch('HOT');
		this.index = 0;
		this.onTinyItemHandler = this.onTinyItemTap.bind(this);
	}