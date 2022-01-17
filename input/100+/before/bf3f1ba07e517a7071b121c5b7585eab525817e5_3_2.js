function self(index, value) {
		var d;
		if (this.d.promise._base.resolved) {
			return false;
		}
		if (this.cb) {
			if (!this.limit) {
				d = deferred();
				this.held.push(d.resolve);
				d.promise(self.bind(this, index, value));
				return true;
			}
			try {
				value = call.call(this.cb, this.context, value, index, this.list);
			} catch (e) {
				this.d.resolve(e);
				return false;
			}
			if (isPromise(value) && isPromise(value = value.valueOf())) {
				--this.limit;
				value.end(function (value) {
					++this.limit;
					this.unhold(index, value);
				}.bind(this), this.d.resolve);
				return true;
			} else if (isError(value)) {
				this.d.resolve(value);
				return false;
			}
		}
		this.unhold(index, value);
		return true;
	}