function(request,response){
	var user_id = request.params.id;

	if (request.method === "GET") {
		UserProfile.getUserProfile(user_id, function(error, result) {
			if (result) {
				response.writeHead(200, { 'Content-Type': 'application/json' });
				response.end(JSON.stringify({ errorcode: 0, user: result }));
			} else {
				response.writeHead(200, { 'Content-Type': 'application/json' });
				response.end(JSON.stringify({ errorcode: 1, message: "User not found" }));
			}

		});

	}

	if (request.method === "PUT") {
		UserProfile.updateProfile(user_id, function(error, result) {
			if (result) {
				response.writeHead(200, { 'Content-Type': 'application/json' });
				response.end(JSON.stringify({ errorcode: 0, user: result }));
			} else {
				response.writeHead(200, { 'Content-Type': 'application/json' });
				response.end(JSON.stringify({ errorcode: 1, message: "User not found" }));
			}

		});
	}

}