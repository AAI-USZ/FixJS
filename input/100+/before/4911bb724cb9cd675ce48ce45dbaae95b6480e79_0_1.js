function () {
		var socketOptions = {};
		
		socketOptions.key = this.keyData;
		socketOptions.cert = this.certData;
		socketOptions.passphrase = this.options.passphrase;
		socketOptions.ca = this.options.ca;
		
		this.socket = tls.connect(
			this.options['port'],
			this.options['gateway'],
			socketOptions,
			function () {
				if (!this.socket.authorized) {
					this.deferredConnection.reject(this.socket.authorizationError);
					return;
				}
				
				if (this.connectionTimeout) {
					clearTimeout(this.connectionTimeout);
				}
				
				if (this.options.connectionTimeout > 0) {
					this.connectionTimeout = setTimeout(this.destroyConnection.bind(this), this.options.connectionTimeout);
				}
				
				debug("Connection established");
				this.deferredConnection.resolve();
			}.bind(this));
	
		this.socket.on('data', this.handleTransmissionError.bind(this));
		this.socket.on("drain", this.socketDrained.bind(this));
		this.socket.on("error", this.destroyConnection.bind(this));
		this.socket.on("end", this.restartConnection.bind(this));
		this.socket.once('close', this.restartConnection.bind(this));
	}