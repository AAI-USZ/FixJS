function(appType, request, response) {
	if (request.method === "PUT") {
		if(request.session && request.session.user){
			QueryES.removeFollower(request.params.uid, request.session.user.uuid, appType, function(err, result) {
				if (result) {
					response.writeHead(200, { 'Content-Type': 'application/json' });
					response.end(JSON.stringify({ errorcode: 0, question: result}));
				} else {
					response.writeHead(200, { 'Content-Type': 'application/json' });
					response.end(JSON.stringify({ errorcode: 1, message: err }));
				}
			});
		}
		else{
			response.writeHead(200, { 'Content-Type': 'application/json' });
			response.end(JSON.stringify({ errorcode: 1, message: 'You aren\'t logged in' }));
		}
	}
}