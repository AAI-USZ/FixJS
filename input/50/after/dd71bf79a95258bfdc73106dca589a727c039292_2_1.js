function Processor () {
		if(Settings.IS_BROWSER_ENVIRONMENT) {
			this.initClient();
		} else {
			this.initServer();
		}
	}