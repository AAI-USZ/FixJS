function(appType, request, response) {
	if (request.method === "GET") {
		QueryES.getCommentByTarget_uuid(request.params.uid, request.params.page, appType, function(err, result) {
			if (result) {
				response.writeHead(200, { 'Content-Type': 'application/json' });
				response.end(JSON.stringify({ errorcode: 0, comments: result }));
			} else {
				response.writeHead(200, { 'Content-Type': 'application/json' });
				response.end(JSON.stringify({ errorcode: 1, message: err }));
			}
		});
	}
}