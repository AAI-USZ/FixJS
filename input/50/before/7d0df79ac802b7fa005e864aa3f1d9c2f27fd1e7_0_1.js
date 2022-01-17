function ClientGame(networker, id) {
		this.networker = networker;
		this.processor = new ClientProcessor(this);
		this.processor.spawnMeWithId(id);
	}