function OmniBot(name, connector, connection) {
	var self = this;
	this.name = name || "OmniOmniBot";
	connection.name = this.name;
	switch (connector) {
		case "irc":
			self.connection = new connectors.IRC(connection);
			break;
		default:
			// 
	}
}