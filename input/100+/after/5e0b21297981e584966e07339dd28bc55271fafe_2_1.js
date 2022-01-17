function(appType, request, response) {
	var query = request.body.query;
	console.log('the query sent is: ' + query);

	if (request.method === "POST") {

		nlp(query, function(query){
			console.log('query after nlp parsing is: ' + query);

			queryES.searchAll(query, appType, function(result) {
				if (result) {
					response.writeHead(200, { 'Content-Type': 'application/json' });
					response.end(JSON.stringify({ errorcode: 0, questions: result }));
				} else {
					response.writeHead(200, { 'Content-Type': 'application/json' });
					response.end(JSON.stringify({ errorcode: 1, message: "Object not found" }));
				}
			});
		});
	}
}