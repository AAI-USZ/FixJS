function() {
		this.inherited(arguments);
		var c$ = this.getOrderedControls(this.container.toIndex);
		for (var i=0, c; c=c$[i]; i++) {
			c.applyStyle("z-index", c$.length - i);
		}
	}