function(appType, request, response) {
	if (request.method === "PUT") {
		QueryES.updateVote(request.params.uid, request.params.dir, appType, function(err, result) {
			if (result) {
				response.writeHead(200, { 'Content-Type': 'application/json' });
				response.end(JSON.stringify({ errorcode: 0, comment: result }));
			} else {
				response.writeHead(200, { 'Content-Type': 'application/json' });
				response.end(JSON.stringify({ errorcode: 1, message: err }));
			}
		});
	}
}