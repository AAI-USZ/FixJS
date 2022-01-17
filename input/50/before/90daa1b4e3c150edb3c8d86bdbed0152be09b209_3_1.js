function getGister (config) {
	var config = require('milo/utils').getConfig(),
		Gister = require('gister');

	return new Gister({
		token: config.github.token
	});
}