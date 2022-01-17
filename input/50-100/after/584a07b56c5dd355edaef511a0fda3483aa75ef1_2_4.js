function(err, result) {
			if (result) {
				response.writeHead(200, { 'Content-Type': 'application/json' });
				response.end(JSON.stringify({ errorcode: 0, question: err }));
			} else {
				response.writeHead(200, { 'Content-Type': 'application/json' });
				response.end(JSON.stringify({ errorcode: 1, message: err }));
			}
		}