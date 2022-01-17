function (plan) {
			var buildEvent = {
				message: interpolate('Build failed - {{0}}', [plan.projectName]),
				details: plan.name,
				url: plan.url
			};
			this.buildFailed.dispatch(buildEvent);
		}