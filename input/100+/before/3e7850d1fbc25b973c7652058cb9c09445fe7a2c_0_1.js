function(layout) {
			var view = layout(this);
			var pl_string = "";
			var pl_id = this.model.get("player_in_possession_id");
			var team_ix = this.model.get("team_in_possession_ix");
			if (pl_id){
				var pl_model = _.find(this.model.get("onfield_" + team_ix).pluck("player"), function(pl_obj){return pl_obj.id == pl_id;});
                if (pl_model != undefined) {pl_string = pl_model.first_name[0] + ". " + pl_model.last_name + " ";}
			}
			return view.render({player_string: pl_string, per_num: this.model.get("period_number")}).then(function(el) {
				this.show_action_buttons();
                this.show_player_name();
                this.model.setButtonHeight();
			});
		}