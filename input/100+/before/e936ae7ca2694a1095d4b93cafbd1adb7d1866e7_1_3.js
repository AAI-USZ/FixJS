function verified(err, rs) {
		if (err) {
			winston.error(err);
			return self.failure('Bad image.');
		}
		var w = rs.dims.width, h = rs.dims.height;
		image.size = rs.stat.size;
		image.dims = [w, h];
		if (!w || !h)
			return self.failure('Invalid image dimensions.');
		if (w > config.IMAGE_WIDTH_MAX)
			return self.failure('Image is too wide.');
		if (h > config.IMAGE_HEIGHT_MAX)
			return self.failure('Image is too tall.');
		if (rs.apng)
			image.apng = 1;

		perceptual_hash(tagged_path, function (err, hash) {
			if (err)
				return self.failure(err);
			image.hash = rs.hash;
			self.db.check_duplicate(image.hash, deduped);
		});
	}