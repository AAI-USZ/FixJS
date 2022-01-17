function() {
		this.c$ = [].concat(this.container.getPanels());
		this.controlsIndex = 0;
		for (var i=0, c$=this.container.getPanels(), c; c=c$[i]; i++) {
			enyo.dom.accelerate(c, this.accelerated);
		}
	}