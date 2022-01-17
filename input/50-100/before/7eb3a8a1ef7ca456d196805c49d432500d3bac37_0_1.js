function (str) {
		var indent = this.bucket.options.indent;

		if (! indent) {
			return str;
		}

		return str.replace(/\n/g, "\n" + indent);
	}