function() {
			this.model.metrics = new Collections.Metrics();
			this.metrics = new Views.Metrics({ collection: this.model.metrics });

			this.model.on("change", this.render, this);
		}