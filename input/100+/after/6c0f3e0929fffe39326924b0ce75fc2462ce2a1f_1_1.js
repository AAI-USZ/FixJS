function(request,response){
	//TODO: replace this with seesion user	
	//request.body.tag.user = 'fakeid';
	if(request.method === 'POST'){
		TagAction.addTag(request.body.tag, function(error, result){
			if(result){				
				response.writeHead(200, { 'Content-Type': 'application/json' });
				response.end(JSON.stringify({ errorcode: 0, resource: result }));
			}
			else{
				response.writeHead(200, { 'Content-Type': 'application/json' });
				response.end(JSON.stringify({ errorcode: 1, message: error }));
			}
		});

		/*
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
		*/
	}
	else if (request.method === 'GET'){				
		console.log("good catch by jordan = " + request.params.id);
		
		TagAction.viewTags({'target':request.params.id}, function(error, result){
			if(result){
				response.writeHead(200, { 'Content-Type': 'application/json' });
				response.end(JSON.stringify({ errorcode: 0, resource: result }));
			}
			else{
				response.writeHead(200, { 'Content-Type': 'application/json' });
				response.end(JSON.stringify({ errorcode: 1, message: error }));
			}
		});		

		/*
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
		*/

	}
	else if (request.method === 'PUT'){
		TagAction.updateTag(request.body.tag, function(error, result){
			if(result){
				response.writeHead(200, { 'Content-Type': 'application/json' });
				response.end(JSON.stringify({ errorcode: 0, resource: result }));
			}
			else{
				response.writeHead(200, { 'Content-Type': 'application/json' });
				response.end(JSON.stringify({ errorcode: 1, message: error }));
			}
		});	

		/*				
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
		*/
	}
	else if (request.method === 'DELETE'){
		//TODO: no method found yet
		// coming soon...

	}


}