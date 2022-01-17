function (sequence) {

			var match;

			sequence = sequence.replace(/\/+/g, '/');
			if (sequence === '/') {
				return { parent: null, name: '/' };
			}
			match = reSplitPath2.exec(sequence);
			if (match) {
				return { parent: match[1], name: match[3] };
			}
			match = reSplitPath.exec(sequence);
			if (match) {
				return { parent: '/', name: match[1] };
			}
		}