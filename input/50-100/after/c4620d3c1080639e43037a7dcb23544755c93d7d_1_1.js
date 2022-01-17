function Bot(name, connector, connection) {
	var self = this;
	this.name = name || "OmniBot";
	connection.name = this.name;
	switch (connector) {
		case "irc":
			self.connection = new connectors.IRC(connection);
			break;
		default:
			throw new Error("Unknown connector " + connector);
	}
}