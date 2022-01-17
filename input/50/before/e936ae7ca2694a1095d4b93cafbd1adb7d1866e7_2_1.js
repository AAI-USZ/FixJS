function checked(err, ident) {
		if (!err)
			_.extend(client.ident, ident);
		if (!synchronize(msg, client))
			report("Bad protocol.", client);
	}