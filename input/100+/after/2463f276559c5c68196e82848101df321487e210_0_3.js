function checkForWinner(dyingPlayer) {
		var help=0;
		console.log(dyingPlayer.PLAYER+" is dead");
		
		if (PLAYERS_ALIVE<=1) {
			for (var i=0; i < players.length; i++) {

				if (players[i] != undefined) {
					console.log("Winner: " + players[i].PLAYER);
					gameState[i].wins++;
					setTimeout(function(){
						//bgmusic.pause()
						bgmusic.pause();
						bgmusic.currentTime = 0;
						exp.pause();
						exp.currentTime = 0;
						scream.pause();
						scream.currentTime = 0;
						itemSpeedUp.pause();
						itemSpeedUp.currentTime = 0;
						bingo.pause();
						bingo.currentTime = 0;
						ohlala.pause();
						ohlala.currentTime = 0;
						warp.pause();
						warp.currentTime = 0;
						cash.pause();
						cash.currentTime = 0;
						alarm.pause();
						alarm.currentTime = 0;
						//bgmusic = null;
						bgmusic = exp = scream = itemSpeedUp = bingo = ohlala = warp = stop = cash = alarm = undefined;
						
						main.gameFinished(gameState);
						for (var i=0; i < players.length; i++) {
							players[i] != undefined;
						}
						STATUS = false;
						Crafty.stop();
					}, 5000);
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
	}