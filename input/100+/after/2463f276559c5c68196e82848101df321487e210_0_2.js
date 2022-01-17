function(){
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
					}