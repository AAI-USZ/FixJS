function (settings) {
		if (!settings.url) {
		    throw {
		        message: 'options.url not set'
		    };
		};
		this.settings = settings;
		this.responseReceived = new signals.Signal();
		this.errorReceived = new signals.Signal();
	}