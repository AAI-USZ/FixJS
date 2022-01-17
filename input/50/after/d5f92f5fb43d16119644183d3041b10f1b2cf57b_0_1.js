function(cb) {

		if (this.hasInit) {
			return cb()
		}

		var self = this
		this.once('worker', cb)
		this.Worker()
		this.hasInit=true
	}