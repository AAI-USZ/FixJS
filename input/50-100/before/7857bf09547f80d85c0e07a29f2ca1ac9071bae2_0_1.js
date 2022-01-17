function(err, repoId){
			if (err) {
				console.log("addUpdateRepo error:", err);
			} else {
				gitHubData.repoId = repoId;
				gitHubData.branchUrl = path.join(gitHubData.repository.url, "tree", gitHubData.ref.split('/')[2]);
				findControls(gitHubData);
			} 
		}