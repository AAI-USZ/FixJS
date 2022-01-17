function (iq) {
		// set up presence handler and send initial presence
		Client.connection.addHandler(Client.on_presence, null, "presence");
		Client.connection.send($pres());
	}