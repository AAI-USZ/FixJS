function(viewCfg){
		var existingView = this.getView(viewCfg);
		if(existingView && existingView.name){
			console.log('View with the name "' + viewCfg.name + '" already exists... overwriting.')
		}

		var newView = this.createView(viewCfg);

		this.getViews()[newView.name] = newView;

		return newView;
	}