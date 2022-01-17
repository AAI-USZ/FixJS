function(data) {
			//Trim the data.
			data = data.replace(/^\s+|\s+$/g, '');
			this.sessionId = data;
		}