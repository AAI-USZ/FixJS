function (plan) {
			var buildEvent = {
				message: interpolate('Build fixed - {{0}}', [plan.projectName]),
				details: plan.name,
				url: plan.url
			};
			this.buildFixed.dispatch(buildEvent);
		}