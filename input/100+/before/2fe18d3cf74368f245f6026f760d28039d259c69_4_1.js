function(existingGame) {
			if (!!existingGame) {
				existingGame.home 		 = game.home;
				existingGame.away 		 = game.away;
				existingGame.homeScore 	 = game.homeScore;
				existingGame.awayScore 	 = game.awayScore;
				existingGame.overtimeWin = game.overtimeWin;
				existingGame.shootoutWin = game.shootoutWin;
				existingGame.played 	 = game.played;
				existingGame.season 	 = game.season;
				existingGame.category 	 = game.category;
				existingGame.arena 	 	 = game.arena;
				
				if (+existingGame.homeScore !== +existingGame.awayScore) {
					existingGame.winner = existingGame.homeScore > existingGame.awayScore ? existingGame.home : existingGame.away;
				} else {
					existingGame.winner = [];
				}
				
				saveGameAndEmitEvent(existingGame, callback);
				
			} else {
				addGame(game, callback);
			}
		}