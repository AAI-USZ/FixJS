function (plugin) {
		var calls = require("./plugins/" + plugin);

		for (var k in calls) {
			if (!plugins.hasOwnProperty(k)) {
				plugins[k] = [];
			}
			plugins[k].push(calls[k]);
		}

		return this;
	}