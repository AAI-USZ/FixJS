function () {

			// Only works when there are a "to" parameter on configuration
			if (!ch.utils.hasOwn(conf, "to") || !conf.to) { return; }

			// Return date object
			return (conf.from === "today") ? today : createDateObject(conf.to);

		}