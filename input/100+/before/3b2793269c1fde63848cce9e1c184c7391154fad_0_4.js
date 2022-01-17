function(repo){		
		if (repo){
			repo.updateAttributes({ 
				title: ghData.repository.name,
				description: ghData.repository.description,
				email: ghData.repository.owner.email,			
			}).error(function(err){				
				callback("error updating repo: " + ghData.repository.url + ", " + err, null);
			}).success(function(){
				console.log("repo " + ghData.repository.url + " updated");
				callback(null, repo.id);
			});
		} else {
			repo = XTagRepo.create({
				repo: ghData.repository.url,
				title: ghData.repository.name, 
				description: ghData.repository.description,
				author: ghData.repository.owner.name,
				email: ghData.repository.owner.email,		
			}).error(function(err){				
				callback("error creating repo: " + ghData.repository.url + ", " + err, null);				
			}).success(function(){
				console.log("repo " + ghData.repository.url + " created");
				callback(null, repo.id);
			});
		}
	}