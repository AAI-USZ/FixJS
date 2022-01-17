function (value, index, accumulator) {
		if (this.cb) {
			if (value && isPromise(value)) {
				if (value.resolved) {
					value = value.value;
					if (isError(value)) {
						return value;
					}
					value = this.processCb(accumulator, index, value);
				} else {
					value = value(this.processCb.bind(this, accumulator, index));
				}
			} else {
				value = this.processCb(accumulator, index, value);
			}
		}
		if (isPromise(value) && value.resolved) {
			value = value.value;
		}
		return value;
	}