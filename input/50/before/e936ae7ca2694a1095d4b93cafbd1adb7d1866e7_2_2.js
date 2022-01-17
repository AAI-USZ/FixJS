function (err, alloc) {
		if (err) {
			var niceErr = "Couldn't post: " + err;
			/* TEMP: Need better nice-error-message policy */
			if (niceErr.length > 40)
				niceErr = "Couldn't allocate post.";
			return report(err, client, niceErr);
		}
	}