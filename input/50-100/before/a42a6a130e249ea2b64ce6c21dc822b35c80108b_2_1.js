function (repo) {
				self.views.push(new Github.Views.GithubRepo({el: '#github-projects', model: repo}));
			}