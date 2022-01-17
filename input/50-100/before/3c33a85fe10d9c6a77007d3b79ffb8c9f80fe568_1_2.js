function(inSender) {
		if (this.activated) {
			this.activated.applyStyle("background", null);
		}
		this.activated = inSender;
		this.activated.applyStyle("background", "lightblue");
		this.doItemSelect(inSender);
	}