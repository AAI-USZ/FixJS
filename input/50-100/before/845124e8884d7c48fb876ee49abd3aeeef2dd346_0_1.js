function() {
		this.inherited(arguments);
		for (var i=0; i<this.panelArrangers.length; i++) {
			this.$.arrangerPicker.createComponent({content:this.panelArrangers[i].name});
		}
	}