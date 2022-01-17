function(count) {
		if (count == 0) return;
		if (count > this.remaining)
			throw new Error("Unexpected end of pattern.");

		this.remaining -= count;
		this.position += count;
		this.current = this.source[this.position];
	}