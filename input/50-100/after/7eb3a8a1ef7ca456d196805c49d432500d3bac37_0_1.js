function (str) {
		var indent = this.bucket.options.indent;

		if (! indent) {
			return str;
		}

		str = str.replace(/\n/g, "\n" + indent);

		// At this point, comments with newlines also were reindented.
		// This change should be removed to preserve the comment intact.
		str = str.replace(/\/\*[^*]*\*+([^\/][^*]*\*+)*\//g, function (match) {
			var r = new RegExp("\n" + indent, 'g');
			return match.replace(r, "\n");
		});

		return str;
	}