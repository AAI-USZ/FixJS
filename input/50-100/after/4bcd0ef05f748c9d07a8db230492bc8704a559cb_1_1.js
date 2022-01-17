function got_supplements(err, rs) {
		if (err) {
			if (client.post === post)
				client.post = null;
			return callback(db.Muggle("Attachment error.", err));
		}
		post.links = rs.links;
		if (rs.image)
			extra.image_alloc = rs.image;
		client.db.insert_post(post, body, extra, inserted);
	}