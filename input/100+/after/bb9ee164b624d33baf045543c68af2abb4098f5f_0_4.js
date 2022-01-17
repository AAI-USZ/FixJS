function () {

		// No queue
		if (!ch.utils.hasOwn(conf, "asyncData")) { return []; }

		// Validated queue
		var q = [];

		// Validate each item in queue to be different to undefined
		$.each(conf.asyncData, function (index, item) {
			if (item) { q.push(item); }
		});

		// Return validated queue
		return q;

	}