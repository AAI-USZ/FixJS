function(appType, request, response) {
	var comment_id = request.params.uid;

	if (request.method === "GET") {
		QueryES.getComment(comment_id, appType, function(result) {
			if (result) {
				response.writeHead(200, { 'Content-Type': 'application/json' });
				response.end(JSON.stringify({ errorcode: 0, comment: result }));
			} else {
				response.writeHead(200, { 'Content-Type': 'application/json' });
				response.end(JSON.stringify({ errorcode: 1, message: "Object not found" }));
			}
		});
	} else if (request.method === "POST"){

		if(request.session && request.session.user){
			//target_uuid, user, objectType, title, body
			var newComment = new comment(request.body.comment.target_uuid
				,request.session.user.uuid
				,request.body.comment.objectType
				,request.body.comment.body);

			QueryES.addComment(newComment, appType, function(result) {
				if (result) {
					response.writeHead(200, { 'Content-Type': 'application/json' });
					response.end(JSON.stringify({ errorcode: 0, comment: result}));
				} else {
					response.writeHead(200, { 'Content-Type': 'application/json' });
					response.end(JSON.stringify({ errorcode: 1, message: "Object not found" }));
				}
			});
		}
		else{
			response.writeHead(200, { 'Content-Type': 'application/json' });
			response.end(JSON.stringify({ errorcode: 1, message: 'You aren\'t logged in' }));
		}


	} else if (request.method === "PUT") {

		var commentBody = request.body.body;
		QueryES.updateComment(comment_id, commentBody, appType, function(result) {
			response.writeHead(200, { 'Content-Type': 'application/json' });
			response.end(JSON.stringify({ errorcode: 0 }));
		});

	} else if (request.method === "DELETE") {
		QueryES.deleteComment(comment_id, appType, function(result) {
			if(result){
				response.writeHead(200, { 'Content-Type': 'application/json' });
				response.end(JSON.stringify({ errorcode: 0, result: result }));
			}
			else{
				response.writeHead(200, { 'Content-Type': 'application/json' });
				response.end(JSON.stringify({ errorcode: 1, error: "Couldn't delete resource!"}));	
			}
		});
	}
}