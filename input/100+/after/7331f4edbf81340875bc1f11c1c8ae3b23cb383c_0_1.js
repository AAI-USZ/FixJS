function(){

		var self = this;
		this.log("Connecting to " + this.host + " at port " + this.port + "...");

		// create and encrypted connection using ssl
		var stream = this.stream = tls.connect(this.port, this.host, this.keys, function(){

			self.log("Connection established.");
			if (stream.authorized)
				self.log("Credentials were valid!")
			else
				self.log("Credentials were NOT valid: " + stream.authorizationError);

			// stream.setEncoding('utf8');
			self.connected = true;
			self.register();

		});

		stream.on("data", function(data){
			self.log("Message received: " + data);
			self.process(data);
		})

		stream.on("error", function(error){
			self.log_error(error);
			stream.end();
		})

		// stream.on("end", function(){
		//	self.log("Connection ended");
		// })

		stream.on("close", function(had_error){
			// console.log(had_error);
			self.log("Connection closed.");
			self.connected = false;
		});

	}