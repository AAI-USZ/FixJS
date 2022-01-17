function(ev) {
			var my_status = this.options.trackedgame.get("field_status_"+this.options.team_ix);
			my_status[this.model.get("player_id")] = 1 - my_status[this.model.get("player_id")];
			//this.options.trackedgame.set("field_status_"+this.options.team_ix, my_status);
			//this.options.trackedgame.trigger("change:field_status_"+this.options.team_ix, this.model, this.options.team_ix);
			this.render();
		}