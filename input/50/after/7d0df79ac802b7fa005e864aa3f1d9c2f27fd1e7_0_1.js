function ClientGame(networker, id) {
		this.networker = networker;
		this.clientProcessor = new ClientProcessor(this);
		this.clientProcessor.spawnMeWithId(id);

		this.players = {};
	}