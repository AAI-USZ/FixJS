function checked(err, ident) {
		if (!err)
			_.extend(client.ident, ident);
		if (!synchronize(msg, client))
			client.report(db.Muggle("Bad protocol."));
	}