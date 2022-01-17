function gotAborted() {
		var msg = this.request.node.ip + ':' + this.request.node.port + ' error: '
		msg += this.request.timedOut ? 'response timed out' : 'connection aborted'
		this.request.node.failed(
			{ reason: 'aborted'
			, attempt: this.request
			, message: msg
			}
			, this.request)
	}