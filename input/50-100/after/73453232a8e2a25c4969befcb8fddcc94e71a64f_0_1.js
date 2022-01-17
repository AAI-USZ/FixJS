function(el){
				this.$el.toggleClass('onfield',this.options.trackedgame.get("field_status_"+this.options.team_ix)[this.model.get("player_id")]==1);
			}