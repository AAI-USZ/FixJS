function (absHref, json) {

			if (_.has(json, 'customHeader')) {
				settings.custom.header = json.customHeader;
			}
			if (_.has(json, 'customFooter')) {
				settings.custom.footer = json.customFooter;
			}
			if (_.has(json, 'mode')) {
				parser.mode = json.mode;
			}
			if (_.has(json, 'server')) {
				parser.server = json.server;
			}

			return _.map(json.entries, function (jsonEntry) {

				return Entry.get(jsonEntry.absHref, jsonEntry.time, jsonEntry.size, jsonEntry.status, jsonEntry.content);
			});
		}