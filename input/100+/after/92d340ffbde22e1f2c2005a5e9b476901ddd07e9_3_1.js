function(err, result) {
			if (!err) {
				response.writeHead(200, { 'Content-Type': 'application/json' });
				if(result){
					response.end(JSON.stringify({ errorcode: 0, questions: result }));					
				}
				else{
					response.end(JSON.stringify({ errorcode: 0, questions: "No questions found" }));
				}
			} else {
				response.writeHead(500, { 'Content-Type': 'application/json' });
				response.end(JSON.stringify({ errorcode: 1, message: err }));
			}
		}