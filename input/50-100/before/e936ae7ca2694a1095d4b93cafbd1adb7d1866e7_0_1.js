function (err, quants) {
		if (err) {
			winston.error(err);
			return callback("Limiter failure.");
		}
		if (quants[0] > config.SHORT_TERM_LIMIT ||
				quants[1] > config.LONG_TERM_LIMIT)
			return callback('Reduce your speed.');

		reserve();
	}