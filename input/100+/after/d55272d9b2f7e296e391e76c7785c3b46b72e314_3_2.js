function(request, response){
	if(request.method === 'GET'){
		if(request.session && request.session.user){
			Star.getStarredResources(request.session.user.uuid, function(error, result){
				if(result){
					response.writeHead(200, { 'Content-Type': 'application/json' });
					response.end(JSON.stringify({ errorcode: 0, resources: result }));
				}
				else{
					response.writeHead(200, { 'Content-Type': 'application/json' });
					response.end(JSON.stringify({ errorcode: 1, message: error }));
				}
			});
		}else{
			response.writeHead(200, { 'Content-Type': 'application/json' });
			response.end(JSON.stringify({ errorcode: 2, message: 'You aren\'t logged in' }));
		}
	}
}