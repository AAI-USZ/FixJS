function(appType, request, response) {
	var comment_id = request.params.uid;
	
	if (request.method === "GET") {
		queryES.getComment(comment_id, appType, function(result) {
			if (result) {
				response.writeHead(200, { 'Content-Type': 'application/json' });
				response.end(JSON.stringify({ errorcode: 0, comment: result }));
			} else {
				response.writeHead(200, { 'Content-Type': 'application/json' });
				response.end(JSON.stringify({ errorcode: 1, message: "Object not found" }));
			}
		});
		
	} else if (request.method === "PUT") {
		var commentBody = request.body.commentBody;
		queryES.updateComment(comment_id, commentBody, appType, function(result) {
			response.writeHead(200, { 'Content-Type': 'application/json' });
			response.end(JSON.stringify({ errorcode: 0 }));
		});
		
	} else if (request.method === "DELETE") {
		queryES.deleteComment(comment_id, appType, function(result) {
			response.writeHead(200, { 'Content-Type': 'application/json' });
			response.end(JSON.stringify({ errorcode: 0 }));
		});
	}
}