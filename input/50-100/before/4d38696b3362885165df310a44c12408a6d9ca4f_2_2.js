function(){
		var i = 0,
			l = this.getViews().length,
			view,
			views = {};

		for(; i < l; i++){
			view = this.getViews()[i];

			views[view.name] = this.createView(view);
		}

		this.config.views = views;
	}