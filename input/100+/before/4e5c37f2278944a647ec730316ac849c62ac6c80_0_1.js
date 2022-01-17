function(appType, request, response) {
	var question_id = request.params.uid;
	if (request.method === "GET") {
		queryES.getQuestion(question_id, appType, function(result) {
			if (result) {
				response.writeHead(200, { 'Content-Type': 'application/json' });
				response.end(JSON.stringify({ errorcode: 0, question: result }));
			} else {
				response.writeHead(200, { 'Content-Type': 'application/json' });
				response.end(JSON.stringify({ errorcode: 1, message: "Object not found" }));
			}
		});
		
	}

	//post a new question
	else if (request.method === "POST"){

		//TODO: the user id should be grabbed from seesion, so we know how is creating a new question
		//if not log in, cannot create a question
		console.log(request.body.question);
		//user, title, body, category
		var newQuestion = new question('fakeid'
		,request.body.question.title
		,request.body.question.body
		,request.body.question.category);


		queryES.addQuestion(newQuestion, appType, function(result) {
			if (result) {
				response.writeHead(200, { 'Content-Type': 'application/json' });
				response.end(JSON.stringify({ errorcode: 0, question: result}));
			} else {
				response.writeHead(200, { 'Content-Type': 'application/json' });
				response.end(JSON.stringify({ errorcode: 1, message: "Object not found" }));
			}
		});

	}

	else if (request.method === "PUT") {
		//TODO: need update document and unit-test
		var questionTitle = request.body.questionTitle;
		var questionBody = request.body.questionBody;

		queryES.updateQuestion(question_id,questionTitle,questionBody, appType, function(result) {
			if (result) {
				response.writeHead(200, { 'Content-Type': 'application/json' });
				response.end(JSON.stringify({ errorcode: 0, question: result }));
			} else {
				response.writeHead(200, { 'Content-Type': 'application/json' });
				response.end(JSON.stringify({ errorcode: 1, message: "Object not found" }));
			}
		});

	} else if (request.method === "DELETE") {
		queryES.deleteQuestion(question_id, appType, function(result) {
			if (result) {
				response.writeHead(200, { 'Content-Type': 'application/json' });
				response.end(JSON.stringify({ errorcode: 0, question: result }));
			} else {
				response.writeHead(200, { 'Content-Type': 'application/json' });
				response.end(JSON.stringify({ errorcode: 1, message: "Object not found" }));
			}
		});
	}
}