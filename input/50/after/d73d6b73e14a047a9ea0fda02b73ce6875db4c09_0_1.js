function Server(options) {
		coordinator = new Coordinator();
		httpServer = new HttpServer(options);
		this.socket = new Socket(httpServer.getServer(), options, coordinator);
	}