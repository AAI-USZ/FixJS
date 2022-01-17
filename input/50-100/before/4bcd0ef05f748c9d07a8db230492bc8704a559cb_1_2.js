function inserted(err) {
		if (err) {
			if (client.post === post)
				client.post = null;
			winston.error(err);
			return callback("Couldn't allocate post.");
		}
		post.body = body;
		callback(null, get_post_view(post));
	}