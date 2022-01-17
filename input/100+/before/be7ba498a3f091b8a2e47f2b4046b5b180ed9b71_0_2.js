function () {   
		Session.set("team2_action", "players");
        Session.set("team2_subaction", "");
        console.log("Recording shot assist +"+points);
        Session.set("possession", "team1");
        var player = Players.find(Session.get("selected_player")).fetch()[0];
        if (player) {
		    var points = 2; 
            var fpoints = 2; 
			var action_text = player.name+' made a shot, 2 points assist';

		    Actions.insert({player_id: Session.get("selected_player"), game_id: 1, action_name: 'shot', sub_action:'shot_2_assist', feed_text: action_text, points: points, fanpoints: fpoints, date_created: new Date()});
		    Players.update(Session.get("selected_player"), {$inc: {score: points, fanpoints: fpoints}});
		    Games.update({name:'game1'},{$inc: {team1_score: points}});
        };
	}