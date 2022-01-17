f		//we start here 1 character before a '['
		this.move(1);
		var c = this.peek(1);
		var indexitems = [];
		var marker;

		if (c == '{') {
			indexitems.push(new Property("-1", false, this.readPropertyGroup()));
			c = this.peek(1);
			if (c == ',') {
				this.move(1);
				c = this.peek(1);
			}
		}

		if (isDigit(c))
			indexitems.push.apply(indexitems, this.readIndexItems());

		this.move(1);
		var mm = {
			min:0,
			max:Number.MAX_VALUE
		};
		if (this.current == '$') {
			marker = this.readNumber();
			this.move(1);
		}
		else marker = null;

		if (this.current != ']')
			throw new Error("Unexpected character '" + this.current + "' in pattern.");

		if (this.remaining > 0) {
			this.readQuantity(mm);
		}
		return new propex(indexitems, marker, true, mm.min, mm.max);
	},
