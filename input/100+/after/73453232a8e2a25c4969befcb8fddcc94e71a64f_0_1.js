function() {
			this.model.get("roster_1").on("reset", this.render, this);
			this.model.get("roster_2").on("reset", this.render, this);
		}