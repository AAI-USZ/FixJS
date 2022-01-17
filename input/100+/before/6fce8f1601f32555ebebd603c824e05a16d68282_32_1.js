function (settings) {
			if (!settings.name) throw { name: 'ArgumentInvalid', message: 'settings.name not set' };
			this.isInitialized = false;
			this.settings = settings;
			this.name = settings.name;
			this.plans = {};
			this.plansCount = 0;
			this.errorThrown = new signals.Signal();
			this.updateStarted = new signals.Signal();
			this.updateFinished = new signals.Signal();
			this.buildFailed = new signals.Signal();
			this.buildFixed = new signals.Signal();
		}