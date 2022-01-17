function defaultOptions() {
		var util = require('./util');
		var options = util.setOptions({});
		delete(options.debug);
		delete(options.fileEncoding);
		for (var i in options) {
			if (typeof options[i] == 'function') {
				delete(options[i]);
			}
		}
		return options;
	}