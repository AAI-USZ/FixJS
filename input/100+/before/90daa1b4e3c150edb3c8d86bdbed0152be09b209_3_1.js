function getConfig () {

	var configPublic = require('milo/config.public'),
		fs = require('fs'),
		configPrivate,
		config = {},
		key;

	for (key in configPublic.global) {
		config[key] = configPublic.global[key];
	}

	if (configPublic.libraries && configPublic.libraries[this.library]) {
		for (key in configPublic.libraries[this.library]) {
			config[key] = configPublic.libraries[this.library][key];
		}
	}

	if (fs.existsSync(miloPath + 'config.private.json')) {
		try {
			configPrivate = require('milo/config.private');
			for (key in configPrivate.global) {
				config[key] = configPrivate.global[key];
			}

			if (configPrivate.libraries && configPrivate.libraries[this.library]) {
				for (key in configPrivate.libraries[this.library]) {
					config[key] = configPrivate.libraries[this.library][key];
				}
			}
		}
		catch (e) {

		}
	}

	return config;

}