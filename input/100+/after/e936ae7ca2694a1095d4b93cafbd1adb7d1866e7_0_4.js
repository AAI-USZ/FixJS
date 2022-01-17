function (rs, next) {
		if (!rs[0])
			return callback(Muggle('Thread does not exist.'));
		if (rs[1])
			return callback(Muggle('Thread is already deleted.'));
		var m = r.multi();
		// order counts
		m.incr(archiveKey + ':bumpctr');
		m.hgetall(key);
		m.hgetall(key + ':links');
		m.llen(key + ':posts');
		m.smembers(key + ':privs');
		m.exec(next);
	}