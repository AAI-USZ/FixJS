function () {
		var keys = Object.keys(this.requests)
		for (var i = 0; i < keys.length; i++) {
			var r = this.requests[keys[i]]
			var expireTime = clock - r.options.timeout
			if (r.lastTouched <= expireTime) {
				this.emit("timeout", r)
				r.timedOut = true
				r.abort()
			}
		}
		if (!this.healthy) {
			this.ping()
		}
		this.requestRate = this.requestCount - this.requestsLastCheck
		this.requestsLastCheck = this.requestCount
	}