function (err, dels) {
		if (err)
			client.report(db.Muggle("Couldn't delete.", err));
	}