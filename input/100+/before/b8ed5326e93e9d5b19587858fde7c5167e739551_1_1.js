function() {

     Session.set("score", 0);
     Session.set("game_id", 1);
     Session.set("team1_name", "NextSpace");
     Session.set("team2_name", "Coloft"); 
     Session.set("team1_action", "players");
     Session.set("team2_action", "players");
     Session.set("team1_score", 0);
     Session.set("team2_score", 0);
     Session.set("posession", "team1");

     if (Players.find().count() === 0) {
        Players.insert({name: 'Jared', team_id:1, game_id:1, score: 0, picture: 'jared.jpg'});
        Players.insert({name: 'Mike', team_id:1, game_id:1, score:0, picture: 'mike.jpg'});
        Players.insert({name: 'Philippe', team_id:1, game_id:1, score:0, picture: 'philippe.jpg'});
        Players.insert({name: 'Avesta', team_id:2, game_id:1, score:0, picture: 'avesta.jpg'});
        Players.insert({name: 'Cameron', team_id:2, game_id:1, score:0, picture: 'cameron.jpg'});
                
     }
	 if (Games.find().count() === 0) {
		var game_id = Games.insert({name:'game1', team1_id:1, team2_id:2, team1_score:2, team2_score:2});
        Session.set("game_id", game_id);
        console.log("setting Game New game:"+game_id);
 	} else {
        var game = Games.find({name:'game1'}).fetch()[0];
        Session.set("game_id", game._id);
        console.log("setting Game Loading game:"+game._id);
    }

   }