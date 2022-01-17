function(count) {
		if (count > this.remaining)
			throw new Error("Unexpected end of pattern.");
		return this.source[this.position + count];
	}