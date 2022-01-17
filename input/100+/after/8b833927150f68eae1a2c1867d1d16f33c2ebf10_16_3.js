function(test) {
			var options = {
				host:currentHost,
				port:this.port,
				method:"GET",
				path:"/api/question/" +  questionUid,
				headers: {
					"content-type": "application/json"
				}
			}
		
			var request = http.get(options, function(response){
				var body = "";
				response.on('data', function (chunk) {
					body += chunk;
				}).on('end', function() {
					body = JSON.parse(body);
					test.ok(body.errorcode === 0 &&
						body.question.user === userUid &&
						body.question.title === updatedQuestionBody);
					test.done();
				});
			});
		}