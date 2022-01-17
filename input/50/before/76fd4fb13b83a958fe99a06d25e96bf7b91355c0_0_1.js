function Networker(socketLink) {
		this.socketLink = socketLink;
		this.GameController = null;

		this.init();
	}