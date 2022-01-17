function() {
		var owner = this.getInstanceOwner();
		this.$.headerComponents.destroyClientControls();
		this.$.headerComponents.createComponents(this.headerComponents, {owner: owner});
		this.$.headerComponents.resized();
	}