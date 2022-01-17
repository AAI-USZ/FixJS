function(done) {
		var teamModel = team.getModel()
		  ,	categoryModel = category.getModel()
		  , gameModel = game.getModel(); 
		
		testGame = {};
		
		categoryModel.remove({}, function() {			
			teamModel.remove({}, function() {
				gameModel.remove({}, function() {
					done();	
				});
			});
		});
	}