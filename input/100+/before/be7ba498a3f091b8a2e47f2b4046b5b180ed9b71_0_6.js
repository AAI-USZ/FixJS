function () {
		Session.set("team2_action", "players");
        var points = 0;
        var fpoints = 0;
        Session.set("team1_subaction", "");
        console.log("Recording shot miss 3");
        Session.set("possession", "team1");
        var player = Players.find(Session.get("selected_player")).fetch()[0];
        Actions.insert({player_id: Session.get("selected_player"), game_id: 1, action_name: 'shot', sub_action:'shot+2', feed_text: player.name+' missed a 3 point shot', points: points, fanpoints:fpoints, date_created: new Date()});
        Players.update(Session.get("selected_player"), {$inc: {score: points, fanpoints: fpoints}});
        Games.update({name:'game1'},{$inc: {team1_score: points}});
	}