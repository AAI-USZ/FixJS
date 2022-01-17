function(appType, request, response) {
	var userId = request.params.uid;

	if (request.method === "GET") {
		QueryES.getAllQuestionByUserID(userId, request.params.page, appType, function(result) {
			if (result) {
				response.writeHead(200, { 'Content-Type': 'application/json' });
				response.end(JSON.stringify({ errorcode: 0, questions: result }));
			} else {
				response.writeHead(200, { 'Content-Type': 'application/json' });
				response.end(JSON.stringify({ errorcode: 1, message: "Object not found" }));
			}
		});
	}
	//deprecated, used POST for question in questionRoute

//	} else if (request.method === "POST") {
//		queryES.addQuestion(request.body.question, appType, function(result) {
//			if (result) {
//				response.writeHead(200, { 'Content-Type': 'application/json' });
//				response.end(JSON.stringify({ errorcode: 0, question: result}));
//			} else {
//				response.writeHead(200, { 'Content-Type': 'application/json' });
//				response.end(JSON.stringify({ errorcode: 1, message: "Object not found" }));
//			}
//		});
//	}}
