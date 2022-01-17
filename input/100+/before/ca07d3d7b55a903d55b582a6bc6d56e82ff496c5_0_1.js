function(){
			var sc_ix = this.get("visible_screen");//0 is roster1, 1 is roster2, 2 is action
			if (sc_ix>0){//If the new screen is roster2 or action.
				var old_game = JSON.parse(localStorage.getItem("trackedGame"));
				var old_status = old_game && old_game["field_status_"+sc_ix];
				var tm_id = this.get("game").get("team_"+sc_ix+"_id");
				var new_status = this.get("field_status_"+sc_ix);
				_.each(new_status, function (value, key, list){
					//console.log(key + " " + value);
					if ((old_status===null && value==1) || (old_status && old_status[key]!=value)){
						var event_type = 80;
						if (value==0){event_type = event_type + 1;}
						if (this.get("injury_to")){event_type = event_type + 2;}
						var this_event = this.create_event();
						this_event.set({type: event_type, player_1_id: key, player_1_team_id: tm_id});
						this.save_event(this_event);
					}
				}, this);
			}
		}