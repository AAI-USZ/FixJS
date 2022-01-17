function() {
		this.c$ = [].concat(this.container.getPanels());
		this.controlsIndex = 0;
		for (var i=0, c$=this.container.getPanels(), c; c=c$[i]; i++) {
			enyo.dom.accelerate(c, this.accelerated);
			if (enyo.platform.safari) {
				// On Safari-desktop, sometimes having the panel's direct child set to accelerate isn't sufficient
				// this is most often the case with Lists contained inside another control, inside a Panels
				var grands=c.children;
				for (var j=0, kid; kid=grands[j]; j++) {
					enyo.dom.accelerate(kid, this.accelerated);
				}
			} 
		}
	}