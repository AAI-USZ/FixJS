function (settings) {
			if (!settings.name) {
				throw { name: 'ArgumentInvalid', message: 'settings.name not set' };
			}
			this.settings = settings;
			this.name = settings.name;
			this.projects = {};
			this.errorThrown = new signals.Signal();
			this.updateStarted = new signals.Signal();
			this.updateFinished = new signals.Signal();
			this.buildFailed = new signals.Signal();
			this.buildFixed = new signals.Signal();
		}