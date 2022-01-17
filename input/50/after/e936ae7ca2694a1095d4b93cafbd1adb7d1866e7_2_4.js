function (err) {
		if (err)
			client.report(db.Muggle("Couldn't finish post.", err));
	}