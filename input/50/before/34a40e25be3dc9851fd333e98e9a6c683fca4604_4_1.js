function (project) {
			var buildEvent = {
				message: interpolate('Build failed - {{0}}', [project.projectName()]),
				details: project.projectName(),
				url: project.url
			};
			this.buildFailed.dispatch(buildEvent);
		}