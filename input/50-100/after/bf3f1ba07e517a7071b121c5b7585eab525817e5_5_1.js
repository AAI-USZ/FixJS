function () {
		var value = this.list[this.current];
		if (isPromise(value)) {
			if (!value.resolved) {
				value.end(this.processCb.bind(this), this.resolve);
				return;
			}
			value = value.value;
		}
		this.processCb(value);
	}