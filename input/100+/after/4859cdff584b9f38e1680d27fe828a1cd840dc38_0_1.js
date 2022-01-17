function() {
			//TODO: Remove attributes that are not stored (gameevents)
			var game = _.clone(this.attributes);

            // Add a formatted start time 
            // TODO: Put this function in namespace?
            game.start_time_string = "";
            if (game.start_time !== "" ){ //parse the start time and make it human-readable
                var arr = game.start_time.split(/[\- :T]/);
                var start_time_utc = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4]); //Parse the ISOformat start time
                var tz_minutes_offset = new Date().getTimezoneOffset();//The offset in minutes from GMT/UTC
                var start_time = new Date(start_time_utc.getTime() + (tz_minutes_offset * 60 * 1000)); //Start time using user's system clock
                var minutes = start_time.getMinutes();
                if (minutes < 10) {minutes = "0" + minutes;} //Make the minutes field two digits
                game.start_time_string = start_time.getHours() + ":" + minutes + " " + start_time.toLocaleDateString();
            }
            
            game.team_1 = _.isFunction(this.get("team_1").get) ? this.get("team_1").toJSON() : this.get("team_1");
            game.team_2 = _.isFunction(this.get("team_2").get) ? this.get("team_2").toJSON() : this.get("team_2");
            game.tournament = (this.get("tournament")!==null && _.isFunction(this.get("tournament").get)) ? this.get("tournament").toJSON() : this.get("tournament");
            
            //delete game.tournament;
            //delete game.team_1;
            //delete game.team_2;

            return game;
		}