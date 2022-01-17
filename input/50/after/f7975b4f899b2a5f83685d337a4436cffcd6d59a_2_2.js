function() {
		try {
			callback(JSON.parse(this.responseText));
		} catch(error) {
			callback({error: error + " (" + this.responseText + ")" });
		}
	}