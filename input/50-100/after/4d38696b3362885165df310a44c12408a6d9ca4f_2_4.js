function(){
		var views = this.getViewInstances(),
			view;

		for (var property in views) {
			if (views.hasOwnProperty(property)) {
				view = views[property];

				this.refreshView(view);
			}
		}
	}