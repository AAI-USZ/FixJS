function try_thumb(t) {
		if (!t)
			return;
		if (!t.match(m))
			return callback('Invalid thumbnail.');
		mvs.push(mv.bind(null, 'thumb', t));
	}