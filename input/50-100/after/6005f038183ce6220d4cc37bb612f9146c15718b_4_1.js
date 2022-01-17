function(appType, request, response) {
	var commentId = request.params.uid;
	var direction = request.params.dir;
	
	if (request.method === "POST") {
		queryES.updateVote(commentId, direction, appType, function(result) {
			response.writeHead(200, { 'Content-Type': 'application/json' });
			response.end(JSON.stringify({ errorcode: 0 }));
		});
	}
}