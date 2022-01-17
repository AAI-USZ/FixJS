function(appType,request,response){
	console.log("what");
	if (request.method === "GET") {
		queryES.getAllComments(appType, function(result) {
			if (result) {
				response.writeHead(200, { 'Content-Type': 'application/json' });
				response.end(JSON.stringify({ errorcode: 0, comments: result }));
			} else {
				response.writeHead(200, { 'Content-Type': 'application/json' });
				response.end(JSON.stringify({ errorcode: 1, message: "Object not found" }));
			}
		});
	}

}