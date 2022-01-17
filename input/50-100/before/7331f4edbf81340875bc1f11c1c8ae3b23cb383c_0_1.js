function(callback){

		if (this.connected) return callback(new Error("Already connected."))

		if (!this.host || !this.port)
			return callback(new Error("No host or port given. Cannot connect."))
		else if (!this.device_key)
			return callback(new Error("Cannot connect without valid device key."))

		this.read_keys(function(err){

			if (err) return callback(err);
			self.connect();
			callback(null, self);

		});

	}