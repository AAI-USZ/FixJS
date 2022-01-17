function(params, callback) {
		
		getCategoryById(params.categoryId, function(category) {
			var savedGameIsLatestGame = !!category && !!category.latestGame && category.latestGame._id && category.latestGame._id.toString() === params.game._id.toString()
			  , savedGameIsNewerThanCurrentLatestGame =  !!category && (!category.latestGame.played || category.latestGame.played < params.game.played);
			
			if (savedGameIsLatestGame) {
				category.latestGame.played 		= params.game.played;
				category.latestGame.homeScore 	= params.game.homeScore;
				category.latestGame.awayScore 	= params.game.awayScore;
				
				if (+category.latestGame.homeScore !== +category.latestGame.awayScore) {
					category.latestGame.winner = category.latestGame.homeScore > category.latestGame.awayScore ? category.latestGame.home : category.latestGame.away;
				} else {
					category.latestGame.winner = [];
				}
				
				category.save(function(e, updatedCategory) {
					if (!!callback) {
						callback(updatedCategory);
					}
				});				
			} else if (savedGameIsNewerThanCurrentLatestGame) {
					category.latestGame = params.game;

					category.save(function(e, updatedCategory) {
						if (!!callback) {
							callback(updatedCategory);
						}
					});
			} else {
				if (!!callback) {
					callback(category);
				}	
			}
		});
	}