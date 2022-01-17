function() {
		var c$ = this.container.getPanels();
		var b = this.containerBounds;
		var w = this.controlWidth = b.width/3;
		var h = this.controlHeight = b.height/3;
		for (var i=0, c; c=c$[i]; i++) {
			c.setBounds({width: w, height: h});
		}
	}