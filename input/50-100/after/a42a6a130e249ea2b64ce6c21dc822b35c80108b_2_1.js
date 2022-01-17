function () {
			var self = this;

			self.$('.loading').hide();
			if (self.repos.length) {
				self.repos.each(function (repo) {
					self.views.push(new Github.Views.GithubRepo({el: '.github-projects', model: repo}));
				});
			} else {
				self.showStatic();
			}
		}