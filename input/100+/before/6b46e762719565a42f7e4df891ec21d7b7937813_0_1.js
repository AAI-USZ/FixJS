function(){

		// create TCP stream to server
		var socket = this.socket = new net.Socket();
		socket.setTimeout(this.timeout);

		socket.connect(parseInt(this.target_port), this.target_host);

		socket.once('connect', function(){
			// self.established = true;
			self.done('connect');
		});

		socket.once('timeout', function(e){
			self.done('error', new Error("Connection timeout"));
		});

		// listen for any errors
		socket.once('error', function(e){
			self.done('error', e);
		})

	}