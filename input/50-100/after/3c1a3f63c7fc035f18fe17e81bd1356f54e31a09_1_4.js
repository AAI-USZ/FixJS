function() {
		var c$ = this.container.getPanels();
		var w=this.colWidth, h=this.colHeight;
		for (var i=0, c; (c=c$[i]); i++) {
			c.setBounds({width: w, height: h});
		}
	}