function(event){
		
 		for (var i=0; i < players.length; i++) {
 			if(players[i] != undefined){
				if(STATUS) { 
 					players[i].trigger("keydownself", event);
				}
			}
 		};
	}