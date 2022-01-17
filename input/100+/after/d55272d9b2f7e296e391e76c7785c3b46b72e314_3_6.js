function(request, response){
	if(request.method === 'DELETE'){
		if(request.session && request.session.user){
			Like.unlikeResource(request.session.user.uuid, request.body.uuid, function(error, result){
				if(result){
					response.writeHead(200, { 'Content-Type': 'application/json' });
					response.end(JSON.stringify({ errorcode: 0, resource: result }));
				}else{
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