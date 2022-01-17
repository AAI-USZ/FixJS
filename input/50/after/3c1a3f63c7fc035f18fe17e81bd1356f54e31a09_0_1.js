function() {
		var p = this.$.samplePanels.getActive();
		if (p) {
			p.destroy();
		}
	}