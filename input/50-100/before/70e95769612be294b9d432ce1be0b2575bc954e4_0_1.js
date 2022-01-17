function gotError(error) {
		this.node.failed(
			{ reason: error.message
			, attempt: this
			, message: this.node.ip + ':' + this.node.port + ' error: ' + error.message
			}
			, this)
		this.node.setHealthy(false)
	}