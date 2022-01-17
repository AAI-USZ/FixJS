function(err, result) {
			if (!err) {
				response.writeHead(200, { 'Content-Type': 'application/json' });
				if(result){
					response.end(JSON.stringify({ errorcode: 0, question: result }));
				}
				else{
					response.end(JSON.stringify({ errorcode: 0, question: "Failed to update vote count" }));
				}
			} else {
				response.writeHead(500, { 'Content-Type': 'application/json' });
				response.end(JSON.stringify({ errorcode: 1, message: err }));
			}
		}