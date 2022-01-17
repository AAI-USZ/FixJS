function (err, quants) {
		if (err)
			return callback(Muggle("Limiter failure.", err));
		if (quants[0] > config.SHORT_TERM_LIMIT ||
				quants[1] > config.LONG_TERM_LIMIT)
			return callback(Muggle('Reduce your speed.'));

		reserve();
	}