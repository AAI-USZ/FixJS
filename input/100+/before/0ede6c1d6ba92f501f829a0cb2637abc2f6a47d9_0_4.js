function() {
		var c = this.peek(1);
		if (!isValidFirstChar(c))
			throw new Error("Unexpected character '" + c + "' in Propex.");

		var len = 1;
		while (true)
		{
			c = this.peek(++len);
			if (!/\w/.test(c)) break; // [a-zA-Z0-9_]
		}
		len--;
		var name = this.source.substr(this.position + 1, len);
		this.move(len);
		return name;
	}