function (err) {
			if (err)
				client.report(db.Muggle("Couldn't add text.",
						err));
		}