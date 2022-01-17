function (absHref, json) {

			if (json.hasOwnProperty('customHeader')) {
				settings.custom.header = json.customHeader;
			}
			if (json.hasOwnProperty('customFooter')) {
				settings.custom.footer = json.customFooter;
			}
			if (json.hasOwnProperty('mode')) {
				parser.mode = json.mode;
			}
			if (json.hasOwnProperty('server')) {
				parser.server = json.server;
			}

			return _.map(json.entries, function (jsonEntry) {

				return Entry.get(jsonEntry.absHref, jsonEntry.time, jsonEntry.size, jsonEntry.status, jsonEntry.content);
			});
		}