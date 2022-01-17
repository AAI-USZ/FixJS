function(){
		this.callParent(arguments);

		// if the 'views' config was supplied with an array with at least one item then we set it up
		if(this.getViewInstances() && Ext.isArray(this.getViewInstances()) && this.getViewInstances().length > 0){
			this.initViews();
		} else {
			this.config.views = {};
		}

		this.initEvents();
	}