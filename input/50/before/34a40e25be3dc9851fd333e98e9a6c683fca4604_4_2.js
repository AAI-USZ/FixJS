function (project) {
			var buildEvent = {
				message: interpolate('Build fixed - {{0}}', [project.projectName()]),
				details: project.projectName(),
				url: project.url
			};
			this.buildFixed.dispatch(buildEvent);
		}