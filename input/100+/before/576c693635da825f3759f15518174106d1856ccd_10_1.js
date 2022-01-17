function(request,response){
	//TODO: replace this with seesion user

	request.body.tag.user_uid = 'fakeid';
	if(request.method === 'POST'){
		Tag.createTag(request.body.tag, function(error, result){
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
		Tag.selectTag(request.body.tag, function(error,result){
			if(result){
				response.writeHead(200, { 'Content-Type': 'application/json' });
				response.end(JSON.stringify({ errorcode: 0, resource: result }));
			}
			else{
				response.writeHead(200, { 'Content-Type': 'application/json' });
				response.end(JSON.stringify({ errorcode: 1, message: error }));
			}

		})

	}
	else if (request.method === 'PUT'){
		Tag.updateTag(request.body.tag, function(error,result){
			if(result){
				response.writeHead(200, { 'Content-Type': 'application/json' });
				response.end(JSON.stringify({ errorcode: 0, resource: result }));
			}
			else{
				response.writeHead(200, { 'Content-Type': 'application/json' });
				response.end(JSON.stringify({ errorcode: 1, message: error }));
			}

		})
	}
	else if (request.method === 'DELETE'){
		//TODO: no method found yet

	}


}