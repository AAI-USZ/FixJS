function(done) {
		var teamModel = team.getModel()
		  ,	categoryModel = category.getModel(); 
		
		testCategory = {};
		
		categoryModel.remove({}, function() {			
			teamModel.remove({}, function() {
				done();
			});
		});
	}