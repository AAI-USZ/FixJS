function(){
		this.callParent(arguments);

		// if the 'views' config was supplied with an array with at least one item then we set it up
		if(this.getViews() && Ext.isArray(this.getViews()) && this.getViews().length > 0){
			this.initViews();
		} else {
			this.config.views = {};
		}

		this.initEvents();
	}