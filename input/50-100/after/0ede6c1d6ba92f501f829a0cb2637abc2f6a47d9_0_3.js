function(count) {
		if (count == 0) return;
		if (count > this.remaining)
			throw new ParseError(this, "Unexpected end of pattern.");

		this.remaining -= count;
		this.position += count;
		this.current = this.source[this.position];
	}