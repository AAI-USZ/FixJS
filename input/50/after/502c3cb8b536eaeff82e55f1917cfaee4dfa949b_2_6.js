function(name) {
			if (this.views.hasOwnProperty(name)) {
				this.views[name].destroy();
				delete this.views[name];
			}
		}