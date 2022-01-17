function(cb) {
		var self = this
		this.once('worker', cb)
		this.Worker()
	}