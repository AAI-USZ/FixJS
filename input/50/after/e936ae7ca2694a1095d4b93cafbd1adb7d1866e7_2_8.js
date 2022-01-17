function (err) {
		if (err)
			client.report(db.Muggle("Couldn't spoiler images.",
					err));
	}