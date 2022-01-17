function gotError(error) {
		var msg = this.node.ip + ':' + this.node.port + ' error: '
		msg += this.timedOut ? 'request timed out' : error.message
		this.node.failed(
			{ reason: error.message
			, attempt: this
			, message: msg
			}
			, this)
		this.node.setHealthy(false)
	}