function(err) {
		if (err) {
			// We did not expect this connection to terminate
			connection = mysql.createConnection(connection.config);
		} else {
			// We expected this to happen, end() was called.
			console.log('closing the db connection');
		}
	}