function(action, data){
		this.log("Sending action " + action);

		if (this.stream.writable) {
			// self.stream.write(JSON.stringify({ action: action, data: data }) + "\n", 'utf8');
			this.stream.write(JSON.stringify({ action: action, data: data }))
		} else {
			this.log_error("Stream not writable!");
			this.disconnect();
		}

	}