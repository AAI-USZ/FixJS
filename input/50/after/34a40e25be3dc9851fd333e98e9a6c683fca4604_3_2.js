function (plan) {
			var buildEvent = {
				buildName: plan.name,
				group: plan.projectName,
				url: plan.url
			};
			this.buildFixed.dispatch(buildEvent);
		}