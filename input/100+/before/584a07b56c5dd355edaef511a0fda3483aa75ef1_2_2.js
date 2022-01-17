function(appType, request, response) {
	var questionId = request.params.uid;

	if (request.method === "PUT") {

		if(request.session && request.session.user){
			QueryES.removeFollower(questionId, request.session.user.uuid, appType, function(result) {
				if (result) {
					response.writeHead(200, { 'Content-Type': 'application/json' });
					response.end(JSON.stringify({ errorcode: 0, question: result}));
				} else {
					response.writeHead(200, { 'Content-Type': 'application/json' });
					response.end(JSON.stringify({ errorcode: 1, message: "Duplicated Follower" }));
				}
			});
		}
		else{
			response.writeHead(200, { 'Content-Type': 'application/json' });
			response.end(JSON.stringify({ errorcode: 1, message: 'You aren\'t logged in' }));
		}
	}
}