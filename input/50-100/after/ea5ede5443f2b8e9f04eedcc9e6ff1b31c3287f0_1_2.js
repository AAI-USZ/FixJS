function () {
		winston.info('Curfew ' + board + ' at ' + now());
		shutdown(board, function (err) {
			if (err)
				winston.error(err);
		});
		setTimeout(enforce.bind(null, board), 30 * 1000);
	}