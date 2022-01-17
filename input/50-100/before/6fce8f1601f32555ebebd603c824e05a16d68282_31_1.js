function (settings) {
			if (!(settings && settings.url && settings.url != '')) {
				throw new Error('settings.url-input not set');
			}
			this.settings = settings;
			this.responseReceived = new signals.Signal();
			this.errorReceived = new signals.Signal();
		}