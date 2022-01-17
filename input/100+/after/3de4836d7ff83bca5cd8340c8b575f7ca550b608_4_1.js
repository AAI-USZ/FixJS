function(request, response) {
	if (request.headers['content-type'] && request.headers['content-type'].indexOf('application/json') !== -1) {
		var question_id = request.params.id;
		var appType = request.body.appType;
		
		if (request.method === "GET") {
			response.writeHead(500, { 'Content-Type': 'application/json' });
					response.end(JSON.stringify({ message: "not implemented" }));
			/*queryES.getQuestion(question_id, questionType, function(result) {
				if (result) {
					response.writeHead(200, { 'Content-Type': 'application/json' });
					response.end(JSON.stringify({ errorcode: 0, question: result }));
				} else {
					response.writeHead(200, { 'Content-Type': 'application/json' });
					response.end(JSON.stringify({ errorcode: 1, message: "Object not found" }));
				}
			});*/
			
		} else if (request.method === "PUT") {
			response.writeHead(500, { 'Content-Type': 'application/json' });
					response.end(JSON.stringify({ message: "not implemented" }));
			/*var questionBody = request.body.questionBody;
			queryES.updateQuestion(question_id, questionBody, questionType, function(result) {
				response.writeHead(200, { 'Content-Type': 'application/json' });
				response.end(JSON.stringify({ errorcode: 0 }));
			});*/
		} else if (request.method === "DELETE") {
			response.writeHead(500, { 'Content-Type': 'application/json' });
					response.end(JSON.stringify({ message: "not implemented" }));
			/*queryES.deleteQuestion(question_id, questionType, function(result) {
				response.writeHead(200, { 'Content-Type': 'application/json' });
				response.end(JSON.stringify({ errorcode: 0 }));
			});*/
		}
	}
}