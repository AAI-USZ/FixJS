function() {
		var c$ = this.container.getPanels();
		var port = this.containerBounds[this.axisSize];
		var box = port - this.margin -this.margin;
		for (var i=0, b, c; (c=c$[i]); i++) {
			b = {};
			b[this.axisSize] = box;
			b[this.offAxisSize] = "100%";
			c.setBounds(b);
		}
	}