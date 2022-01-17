function (err, exists) {
		if (err)
			return callback(err);
		if (!exists)
			return callback(Muggle("Post does not exist."));
		var m = r.multi();
		note_hash(m, image.hash, post.num);
		m.hmset(key, image);
		m.hincrby('thread:' + op, 'imgctr', 1);

		delete image.hash;
		self._log(m, op, common.INSERT_IMAGE, [num, image]);

		var now = new Date().getTime();
		var n = post_volume({image: true});
		update_throughput(m, ip, now, post_volume({image: true}));
		make_image_nontemporary(m, alloc);
		m.exec(callback);
	}