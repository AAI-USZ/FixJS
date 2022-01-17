function(err, result) {
		if (err) {	
			console.log(err);
			client.end();
		}

		console.log(result);

		if (result.length === 0) {
			console.log("DB is empty.");
			client.end();
		}

		var i, 
			remaining = result.length;

		for (i in result) {
			getWords(result[i]);

		}

		client.on('added', function() {
			if (--remaining === 0) {
				client.end();
				callback(data);
			}
		})	
	}