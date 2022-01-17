function processStandardKey(/**Object*/ metadata, /**string*/ key, /**string*/ line) {
		key = standardKeys[key];

		if (key === 'tags') {
			// Usually we get one blank "line" because we are first called to process the text after "tags:",
			// on the same line, and then called with the real data from the next line
			if(line && line.trim()) {
				metadata[key] = metadata[key].concat(line.trim().split(/\s+/));
			}
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