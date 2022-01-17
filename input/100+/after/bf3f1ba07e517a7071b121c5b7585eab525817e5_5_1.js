function (value) {
		if (this.cb) {
			try {
				value = call.call(this.cb, this.context, value, this.current,
					this.list);
			} catch (e) {
				this.resolve(e);
				return;
			}
			if (isPromise(value)) {
				if (!value.resolved) {
					value.end(this.processValue.bind(this), this.resolve);
					return;
				}
				value = value.value;
			}
		}
		this.processValue(value);
	}