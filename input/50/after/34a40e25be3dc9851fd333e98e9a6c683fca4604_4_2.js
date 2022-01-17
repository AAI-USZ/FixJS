function (project) {
			var buildEvent = {
				buildName: project.projectName(),
				group: project.category(),
				url: project.url
			};
			this.buildFixed.dispatch(buildEvent);
		}