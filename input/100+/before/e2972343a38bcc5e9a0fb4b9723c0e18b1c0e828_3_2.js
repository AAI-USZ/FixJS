function (opts) {
		for (var i = 0; i < associations.length; i++) {
			if (!associations[i].hasOwnProperty("opts") || !associations[i].opts.hasOwnProperty("properties")) continue;

			for (var k in associations[i].opts.properties) {
				if (!associations[i].opts.properties.hasOwnProperty(k)) {
					continue;
				}
				if (typeof associations[i].opts.properties[k] == "function") {
					var o = new associations[i].opts.properties[k]();
					if (o instanceof String || o instanceof Boolean || o instanceof Number) {
						associations[i].opts.properties[k] = { "type": typeof associations[i].opts.properties[k]() };
					} else if (o instanceof Date) {
						associations[i].opts.properties[k] = { "type": "date" };
					} else {
						associations[i].opts.properties[k] = { "type": associations[i].opts.properties[k] };
					}
				} else if (typeof associations[i].opts.properties[k] == "string") {
					associations[i].opts.properties[k] = { "type": associations[i].opts.properties[k].toLowerCase() };
				}
			}
		}
		orm._db.createCollection(model, fields, associations, opts);
	}