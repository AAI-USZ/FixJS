function (value, index, accumulator) {
		if (this.cb) {
			if (value && isPromise(value)) {
				value = value(this.processCb.bind(this, accumulator, index));
			} else {
				value = this.processCb(accumulator, index, value);
			}
		}
		if (isPromise(value)) {
			value = value.valueOf();
		}
		return value;
	}