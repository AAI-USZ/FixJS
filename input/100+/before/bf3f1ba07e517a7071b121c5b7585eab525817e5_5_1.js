function (value) {
		if (this.cb) {
			try {
				value = call.call(this.cb, this.context, value, this.current, this.list);
			} catch (e) {
				this.resolve(e);
				return;
			}
			if (isPromise(value) && isPromise(value = value.valueOf())) {
				value.end(this.processValue.bind(this), this.resolve);
				return;
			}
		}
		this.processValue(value);
	}