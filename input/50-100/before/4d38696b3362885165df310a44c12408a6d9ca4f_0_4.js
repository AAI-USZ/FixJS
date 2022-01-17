function(){
		var views = this.getViews(),
			view;

		for (var property in views) {
			if (views.hasOwnProperty(property)) {
				view = views[property];

				this.refreshView(view);
			}
		}
	}