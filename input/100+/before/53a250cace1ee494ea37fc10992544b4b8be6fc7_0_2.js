f            if (!app.api.is_logged_in()) {//Ensure that the user is logged in
                app.api.login();
                return;
            }
			
			//var Team = require("modules/team");
			var Game = require("modules/game");
			var TeamPlayer = require("modules/teamplayer");
			var GameEvent = require("modules/gameevent");
			
			var trackedgame = new TrackedGame.Model({id: gameId});
			trackedgame.fetch(); //localStorage. localStorage requests are synchronous.
			
			//It's useful to know if the game has been tracked previously.
			var was_tracked = !isNaN(trackedgame.get("period_number"));
			
			//Check to see if the game is over and if so ask if it should be enabled.
			if (was_tracked && trackedgame.get("is_over")) {
				var undo_over = confirm("You previously marked this game as over. Press OK to resume taking stats.");
				if (undo_over){
					var events = trackedgame.get("gameevents");
					var last_event = events.at(events.length-1);
					if (last_event.get("type")==98) {
						$.when(last_event.destroy()).then(function() {trackedgame.set("is_over",false);});
					}
				} else {
					Backbone.history.navigate("games/"+gameId, true);
				}
			}
			
			if (!was_tracked){//Game has not yet started. Set it up now.
				trackedgame.set("period_number", 1);
				trackedgame.set("current_state","pulling");
			}
			
			/*
			* Trackedgame has many child objects.
			* These need to be replaced with the proper Backbone models.
			* These models need to be refreshed from the data store.
			*/
			
			//.game
			trackedgame.set("game", new Game.Model(trackedgame.get("game")), {silent:true});
			if (!was_tracked) {trackedgame.get("game").id = gameId;}
			trackedgame.get("game").fetch();
			//Game also has team_1 and team_2 objects that are not yet Backbone Models.
			
			//.onfield and .offfield
			for (var ix=1;ix<3;ix++) {//Setup offfield or onfield with data from localStorage (or empty)
				trackedgame.set("offfield_"+ix, new TeamPlayer.Collection(trackedgame.get("offfield_"+ix)));
				trackedgame.set("onfield_"+ix, new TeamPlayer.Collection(trackedgame.get("onfield_"+ix)));
			}
			//Need team_x_id from game to fetch the rosters
			trackedgame.get("game").bind("reset", function(){
				for (var xx=1;xx<3;xx++){
					_.extend(trackedgame.get("offfield_"+xx),{team_id: trackedgame.get("game").get("team_"+xx+"_id")});
					trackedgame.get("offfield_"+xx).fetch();
					_.extend(trackedgame.get("onfield_"+xx),{team_id: trackedgame.get("game").get("team_"+xx+"_id")});
					if (trackedgame.get("onfield_"+xx).length>0){trackedgame.get("onfield_"+xx).fetch();}
				}
			});
			
			//.gameevents
			trackedgame.set("gameevents",
				new GameEvent.Collection(trackedgame.get("gameevents"),{game_id: gameId}));
			//trackedgame.get("gameevents").fetch(); //TODO: Fetch gameevents once the API is capable of returning events created by the user.
			
			/*
			* EXTRA MODEL BINDINGS.
			*/
			trackedgame.bind("change:current_state",trackedgame.update_state,trackedgame);
			trackedgame.bind("change:is_over",trackedgame.save);
			trackedgame.get("gameevents").bind("add",trackedgame.event_added,trackedgame);
			trackedgame.get("gameevents").bind("remove",trackedgame.event_removed,trackedgame);
			
			trackedgame.get("game").bind("change:team_1", function(){
				if (trackedgame.get("game").get("team_1").name && !trackedgame.get("team_pulled_to_start_ix")){
					trackedgame.start_period_pull();
				}
			});
			
			trackedgame.get("offfield_1").bind("remove",trackedgame.add_removed_player_to_other_collection,trackedgame);
			trackedgame.get("onfield_1").bind("remove",trackedgame.add_removed_player_to_other_collection,trackedgame);
			trackedgame.get("offfield_2").bind("remove",trackedgame.add_removed_player_to_other_collection,trackedgame);
			trackedgame.get("onfield_2").bind("remove",trackedgame.add_removed_player_to_other_collection,trackedgame);
			
			
			/*
			* SET UP THE VIEWS
			*/
			var myLayout = app.router.useLayout("tracked_game");
			myLayout.setViews({
				".sub_team_1": new TrackedGame.Views.SubTeam({model: trackedgame, team_ix: 1}),
				".sub_team_2": new TrackedGame.Views.SubTeam({model: trackedgame, team_ix: 2}),
				//Game action of course requires the full trackedgame.
				".t_game": new TrackedGame.Views.GameAction({model: trackedgame}),
				".rotate_screen": new TrackedGame.Views.RotateButton({model: trackedgame})
			});
			var callback = trackedgame.setButtonHeight;
			//myLayout.render(function(el) {$("#main").html(el);});
			//myLayout.render(function(el) {
				//$("#main").html(el);
			//}).then(function() {
			myLayout.render().then(function(){
                // Unbind any other bindings to the browser height
                $(window).unbind("resize"); //Is there a better way to do this besides binding globally?
                $(window).bind("resize", function() {
                    callback();
                });
                callback();
                
                trackedgame.toggle_screens();
            });
		}
