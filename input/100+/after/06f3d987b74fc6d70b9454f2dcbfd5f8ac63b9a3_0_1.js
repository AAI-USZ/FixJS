function (value) {
		var i, name, args, data
		if (this.resolved) {
			return this.promise;
		}
		if (!--promise.unresolvedCount) {
			clearTimeout(promise.unresolvedTimeout);
		}
		if (promise.monitor) {
			clearTimeout(promise.monitor);
		}
		this.resolved = true;
		if (isPromise(value)) {
			if (!value.resolved) {
				if (!value.dependencies) {
					value.dependencies = [];
				}
				value.dependencies.push(this.promise);
				if (this.promise.pending) {
					if (value.pending) {
						push.apply(value.pending, this.promise.pending);
						this.promise.pending = value.pending;
					} else {
						value.pending = this.promise.pending;
					}
				} else if (value.pending) {
					this.promise.pending = value.pending;
				} else {
					this.promise.pending = value.pending = [];
				}
				return this.promise;
			} else {
				value = value.value;
			}
		}
		this.promise.value = value;
		this.promise.failed = (value && isError(value)) || false;
		this.promise.__proto__ = promise.resolved;
		if (this.promise.dependencies) {
			this.promise.dependencies.forEach(function self(dPromise) {
				dPromise.value = value;
				dPromise.failed = this.failed;
				dPromise.__proto__ = promise.resolved;
				delete dPromise.pending;
				if (dPromise.dependencies) {
					dPromise.dependencies.forEach(self, this);
					delete dPromise.dependencies;
				}
			}, this.promise);
			delete this.promise.dependencies;
		}
		if ((data = this.promise.pending)) {
			for (i = 0; name = data[i], args = data[++i]; ++i) {
				promise.onswitch[name].apply(this.promise, args);
			}
			delete this.promise.pending;
		}
		return this.promise;
	}