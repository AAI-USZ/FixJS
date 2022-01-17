function(inSender, inEvent) {
		if(!this.onlyIconExpands) {
			this.toggleExpanded();
			this.doNodeTap();
		} else {
			if((inEvent.target==this.$.icon.hasNode())) {
				this.toggleExpanded();
			} else {
				this.doNodeTap();
			}
		}
		return true;
	}