function (responsePlan) {
		if (!responsePlan.key) { throw { name: 'ArgumentInvalid', message: 'responsePlan.key is undefined' }; }
		this.state = 'Successful';
		this.key = responsePlan.key;
		this.projectName = responsePlan.projectName;
		this.name = responsePlan.shortName;
		this.isEnabled = responsePlan.enabled;
		this.isBuilding = responsePlan.isBuilding;
		this.isActive = responsePlan.isActive;
		this.url = responsePlan.link.href;
	}