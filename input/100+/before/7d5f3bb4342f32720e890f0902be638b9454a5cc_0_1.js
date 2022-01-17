function processStandardKey(/**Object*/ metadata, /**string*/ key, /**string*/ line) {
		key = standardKeys[key];

		if (key === 'tags') {
			metadata[key] = metadata[key].concat(line.split(/\s+/));
		}
		else if (metadata[key] instanceof Array) {
			metadata[key][metadata[key].length - 1] += (metadata[key][metadata[key].length - 1].length ? '\n' : '') + line;
		}
		else if (metadata[key].hasOwnProperty('summary')) {
			metadata[key].summary += (metadata[key].summary.length ? '\n' : '') + line;
		}
		else {
			metadata[key] += (metadata[key].length ? '\n' : '') + line;
		}
	}