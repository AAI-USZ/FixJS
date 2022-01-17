function checkForWinner(dyingPlayer) {
		var help=0;
		console.log(dyingPlayer.PLAYER+" is dead");
		
		if (PLAYERS_ALIVE<=1) {
			for (var i=0; i < players.length; i++) {
				if (players[i] != undefined) {
					console.log("Winner: " + players[i].PLAYER);
					gameState[i].wins++;
					setTimeout(function(){
						main.gameFinished(gameState);
					}, 2000);
				} else {
					help = help +1;
				}
			}
			if (help == 4) {
				for (var i=0; i < players.length; i++) {
					if (players[i] != undefined) {
						ranking[1] = players[i].PLAYER_NUMBER;
					}
				}
			}
		}
		for (var i = MAX_PLAYERS; i >= 1; i--) {
			if (ranking[i]==0) {
				ranking[i] = dyingPlayer.PLAYER_NUMBER;
				break;
			}
		}
		console.log("erster: " +  ranking[1]);
		console.log("zweiter: " + ranking[2]);
		console.log("dritter: " + ranking[3]);
		
	}