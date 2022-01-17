function (value, index) {
		if (!this.cb && isError(value)) {
			this.d.resolve(value);
			return false;
		}
		++this.waiting;
		if (isPromise(value)) {
			if (isPromise(value = value.valueOf())) {
				value.end(this.processValue.bind(this, index), this.d.resolve);
			} else if (isError(value)) {
				this.d.resolve(value);
				return false;
			} else {
				return this.processValue(index, value);
			}
		} else {
			return this.processValue(index, value);
		}
		return true;
	}