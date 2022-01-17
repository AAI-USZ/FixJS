function() {
		//we start here 1 character before a '{'
		this.move(1);
		var props = this.peek(1) == '}' ? [] : this.readProperties();
		this.move(1);

		var marker = null;
		if (this.current == '$')
		{
			marker = this.readNumber();
			this.move(1);
		}
		else marker = null;

		if (this.current != '}			throw new Error("Unexpected character '" + this.current + "' in Propex.");

		return new propex(props, marker, false, 1, 1);
	},
