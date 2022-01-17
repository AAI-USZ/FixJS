function(categories) {
	var viewModel = [];
	
	for (var i = 0; i < categories.length; i++) {
		var model = {}
		  , category = categories[i]
		  , today = new Date();
		
		model.category = category;
		model.division = category.division === 'dam' ? "- Dam" : category.division;
		model.sportProper = this.toProperCase(category.sport);
		
		if (!!category.latestGame && !!category.latestGame.home) {
			model.category.matchup = category.latestGame.home[0].abbr.toLowerCase() + category.latestGame.away[0].abbr.toLowerCase()
		}
		
		if (category.starts > today) { 
			model.daysLeft = getDayOfYear(category.starts) - getDayOfYear(today);
			model.overlay = model.daysLeft + " dagar kvar";
		} else {
			if (!!category.latestGame && !!category.latestGame.homeScore) {
				model.highlight = category.latestGame.homeScore + "-" + category.latestGame.awayScore;
				
				if (category.latestGame.homeScore !== category.latestGame.awayScore) {
					model.image = category.latestGame.winner[0].abbr.toLowerCase()
				} else {
					model.image = category.latestGame.home[0].abbr.toLowerCase() + category.latestGame.away[0].abbr.toLowerCase()
				}
			} else {
				model.overlay = "Ingen info."
			}
		}
		
		viewModel.push(model);
	}
	
	return viewModel;
}