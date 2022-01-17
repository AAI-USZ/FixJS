function() {
			this.model.bind('change', this.render, this);
			this.model.bind('destroy', this.remove, this);
		}