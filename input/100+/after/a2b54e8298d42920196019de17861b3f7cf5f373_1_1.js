function(query){
			console.log('query after nlp parsing is: ' + query);

			queryData.searchQuery = query;

			QueryES.searchQuestions(appType, request.params.page, queryData, function(err, result){
				if (result) {
					response.writeHead(200, { 'Content-Type': 'application/json' });
					response.end(JSON.stringify({ errorcode: 0, questions: result }));
				} else {
					response.writeHead(200, { 'Content-Type': 'application/json' });
					response.end(JSON.stringify({ errorcode: 1, message: "Object not found" }));
				}
			});
		}