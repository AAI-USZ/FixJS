function() {
		var c$ = this.container.getPanels();
		for (var i=0, c; c=c$[i]; i++) {
			enyo.Arranger.positionControl(c, {left: null, top: null});
			c.applyStyle("left", null);
			c.applyStyle("top", null);
			c.applyStyle("height", null);
			c.applyStyle("width", null);
		}
		this.inherited(arguments);
	}