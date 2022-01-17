function() {
		var owner = this.getInstanceOwner();
		
		this.createChrome([
			{name: "headerComponents", isChrome: true},
			{kind: enyo.FittableRows, name: "client", fit: true, classes: "client", isChrome: true},
			{name: "footerComponents", isChrome: true}
		]);

		this.$.headerComponents.createComponents(this.headerComponents, {owner: this});
		this.$.headerComponents.resized();
		
		this.$.footerComponents.createComponents(this.footerComponents, {owner: this});
		this.$.footerComponents.resized();
		
		this.inherited(arguments);
	}