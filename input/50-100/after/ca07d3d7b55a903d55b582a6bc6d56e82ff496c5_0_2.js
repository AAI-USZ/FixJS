function() {
			this.model.get("game").on("change:team_"+this.options.team_ix, this.render, this);//Team name will update when returned from db.
		}