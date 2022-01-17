function (err) {
			if (err)
				client.report(db.Muggle(
					"Image insertion problem.", err));
		}