function() {
		this.inherited(arguments);
		for (var i=0; i<this.panelArrangers.length; i++) {
			this.$.pickerScroller.createComponent({content:this.panelArrangers[i].name});
		}
		this.panelCount=this.$.samplePanels.getPanels().length;
	}