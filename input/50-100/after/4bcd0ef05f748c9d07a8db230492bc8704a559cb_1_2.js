function inserted(err) {
		if (err) {
			if (client.post === post)
				client.post = null;
			return callback(db.Muggle("Couldn't allocate post.",
					err));
		}
		post.body = body;
		callback(null, get_post_view(post));
	}