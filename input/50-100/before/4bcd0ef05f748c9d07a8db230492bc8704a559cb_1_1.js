function got_supplements(err, rs) {
		if (err) {
			winston.error('supplements: ' + err);
			if (client.post === post)
				client.post = null;
			return callback("Attachment error.");
		}
		post.links = rs.links;
		if (rs.image)
			extra.image_alloc = rs.image;
		client.db.insert_post(post, body, extra, inserted);
	}