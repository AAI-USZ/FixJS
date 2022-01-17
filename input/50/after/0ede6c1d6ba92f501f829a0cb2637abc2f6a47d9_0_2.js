function(count) {
		if (count > this.remaining)
			throw new ParseError(this, "Unexpected end of pattern.");
		return this.source[this.position + count];
	}