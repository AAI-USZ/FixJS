function(){
		var i = 0,
			l = this.getViewInstances().length,
			view,
			views = {};

		for(; i < l; i++){
			view = this.getViewInstances()[i];

			views[view.name] = this.createView(view);
		}

		this.config.views = views;
	}