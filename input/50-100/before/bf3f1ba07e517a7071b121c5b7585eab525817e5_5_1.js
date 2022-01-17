function () {
		var value = this.list[this.current];
		if (isPromise(value) && isPromise(value = value.valueOf())) {
			value.end(this.processCb.bind(this), this.resolve);
			return;
		}
		this.processCb(value);
	}