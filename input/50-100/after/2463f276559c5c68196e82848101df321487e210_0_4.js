function(event){
		for (var i=0; i < players.length; i++) {
 			if(players[i] != undefined){
	 			players[i].trigger("keyupself", event);
			}
 		};
	}