function() {
			this.metrics = new Views.Metrics({ collection: this.model.metrics });
			this.links = new Views.Links({ collection: this.model.links });

			this.model.on("change", this.render, this);
		}