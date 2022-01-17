function () {
    	if (!this.picker.loaded) {
    		Ext.defer(this.expand, 100, this);
    		return;
    	} else {
    		this.callParent();
    	}
    }