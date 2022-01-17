function (newProjectInfo) {
			var oldStatus = status;
			projectName = newProjectInfo.name;
			category = newProjectInfo.category;
			status = newProjectInfo.status;
			if (!oldStatus && newProjectInfo.status !== 'Success') {
				buildFailed.dispatch(this);
			}
			if (oldStatus === 'Success' && newProjectInfo.status !== 'Success') {
				buildFailed.dispatch(this);
			}
			if (oldStatus && oldStatus !== 'Success' && newProjectInfo.status === 'Success') {
				buildFixed.dispatch(this);
			}
			return projectInstance;
		}