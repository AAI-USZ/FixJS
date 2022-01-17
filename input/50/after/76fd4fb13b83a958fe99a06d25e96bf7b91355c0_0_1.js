function Networker(socketLink) {
		this.socketLink = socketLink;
		this.gameController = null;

		this.init();
	}