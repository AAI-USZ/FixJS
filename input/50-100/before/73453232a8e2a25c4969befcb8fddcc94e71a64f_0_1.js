function(el){
				if (this.options.trackedgame.get("field_status_"+this.options.team_ix)[this.model.get("player_id")]){
					console.log("TODO: Change class/css to indicate this player is onfield.");
				} else {
					console.log("TODO: Change class/css to indicate this player is offfield.");
				}
			}