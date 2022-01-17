function(err, repoId){
			if (err) {
				console.log("addUpdateRepo error:", err);
			} else {
				gitHubData.repoId = repoId;
				gitHubData.branchUrl = gitHubData.repository.url + "/" + path.join("tree", gitHubData.ref.split('/')[2]);
				findControls(gitHubData);
			} 
		}