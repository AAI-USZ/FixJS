function() {
			this.model.on('change', this.render, this);
			this.model.on('destroy', this.remove, this);
		}