function(appType, request, response) {
	var userId = request.params.uid;

	if (request.method === "GET") {
		QueryES.getAllQuestionByUserID(userId, request.params.page, appType, function(err, result) {
			if (result) {
				response.writeHead(200, { 'Content-Type': 'application/json' });
				response.end(JSON.stringify({ errorcode: 0, questions: result }));
			} else {
				response.writeHead(200, { 'Content-Type': 'application/json' });
				response.end(JSON.stringify({ errorcode: 1, message: err }));
			}
		});
	}
}