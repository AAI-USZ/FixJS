function() {
		var owner = this.getInstanceOwner();
		this.$.footerComponents.destroyClientControls();
		this.$.footerComponents.createComponents(this.footerComponents, {owner: owner});
		this.$.footerComponents.resized();
	}