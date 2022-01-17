function assignOptionDefaults() {
		var util = require('./util');
		var options = util.setOptions();
		var defaults = optionMeta_default;

		for (var i in optionMeta) {
			optionMeta[i].name = i;

			if (typeof options[i] != 'undefined') {
				optionMeta[i].defaultValue = options[i];
			}

			for (var j in defaults) {
				if (typeof optionMeta[i][j] == 'undefined') {
					optionMeta[i][j] = defaults[j];
				}
			}
		}
	}