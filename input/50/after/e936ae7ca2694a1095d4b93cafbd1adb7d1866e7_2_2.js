function (err, alloc) {
		if (err)
			client.report(db.Muggle("Allocation failure.", err));
	}