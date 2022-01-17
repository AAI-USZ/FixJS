function try_thumb(t) {
		if (!t)
			return;
		if (!t.match(m))
			return callback(Muggle('Invalid thumbnail.'));
		mvs.push(mv.bind(null, 'thumb', t));
	}