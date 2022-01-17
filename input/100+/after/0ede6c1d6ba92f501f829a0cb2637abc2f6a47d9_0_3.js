function() {
		var c;

		var len = 0;
		while (true)
		{
			if (++len > this.remaining) break;
			c = this.peek(len);
			if (!isDigit(c)) break;
		}
		len--;
		if (len < 1)
			throw new ParseError(this, "Invalid Propex pattern.");

		var name = this.source.substr(this.position + 1, len);
		this.move(len);
		return parseInt(name, 10);
	}