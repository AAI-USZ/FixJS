function(appType, request, response) {
	var commentId = request.params.uid;
	var direction = request.params.dir;

	console.log(direction);

	if (request.method === "PUT") {
		QueryES.updateVote(commentId, direction, appType, function(result) {
			response.writeHead(200, { 'Content-Type': 'application/json' });
			response.end(JSON.stringify({ errorcode: 0 }));
		});
	}
}