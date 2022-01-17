function() {
			this.model.on("change:field_status_"+this.options.team_ix, this.render, this);//When the onfield status changes, redo which players are rendered.
			this.model.get("game").on("change:team_"+this.options.team_ix, this.render, this);//Team name will update when returned from db.
		}