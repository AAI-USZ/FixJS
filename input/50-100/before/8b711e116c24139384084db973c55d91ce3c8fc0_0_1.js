function() {
			this._super();
			this.config.query.on("results", this._load_parents.bind(this));
      this.config.query.on("resultsWithParents", this._results_handler.bind(this));
		}