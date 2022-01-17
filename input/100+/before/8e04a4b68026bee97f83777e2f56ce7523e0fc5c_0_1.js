function(request,response){	
	if(request.method === 'POST'){
		MediaAction.addMediaFile(request.body, function(error, result){
			if(result){				
				response.writeHead(200, { 'Content-Type': 'application/json' });
				response.end(JSON.stringify({ errorcode: 0, resource: result }));
			}
			else{
				response.writeHead(200, { 'Content-Type': 'application/json' });
				response.end(JSON.stringify({ errorcode: 1, message: error }));
			}
		});
	}
	else if (request.method === 'GET'){	
		var targetID = request.params.id;							
		MediaAction.viewMedia({'target':targetID}, function(error, result){
			if(result){
				response.writeHead(200, { 'Content-Type': 'application/json' });
				response.end(JSON.stringify({ errorcode: 0, resource: result }));
			}
			else{
				response.writeHead(200, { 'Content-Type': 'application/json' });
				response.end(JSON.stringify({ errorcode: 1, message: error }));
			}
		});		
	}
	else if (request.method === 'PUT'){		
		var targetID = request.params.id;
		MediaAction.updateMediaFile({'target':targetID}, request.body, function(error, result){
			if(result){
				response.writeHead(200, { 'Content-Type': 'application/json' });
				response.end(JSON.stringify({ errorcode: 0, resource: result }));
			}
			else{
				response.writeHead(200, { 'Content-Type': 'application/json' });
				response.end(JSON.stringify({ errorcode: 1, message: error }));
			}
		});	
	}
	else if (request.method === 'DELETE'){
		//TODO: no method found yet
		// coming soon...

	}


}