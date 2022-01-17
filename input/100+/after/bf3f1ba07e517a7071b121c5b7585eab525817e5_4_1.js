function self(value, index) {
		if (!this.initialized) {
			this.initialized = true;
			return isError(this.current = value) ? false : true;
		}
		if (this.current && isPromise(this.current)) {
			if (this.current.resolved) {
				this.current = this.current.value;
				if (isError(this.current)) {
					return false;
				}
			} else {
				this.current =
					this.current(this.processValue.bind(this, value, index));
				return true;
			}
		}
		if (isError(this.current =
			 this.processValue(value, index, this.current))) {
			return false;
		}
		return true;
	}