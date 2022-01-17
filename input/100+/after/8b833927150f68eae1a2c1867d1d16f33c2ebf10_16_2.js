function(test) {
			var options = {
				host:currentHost,
				port:this.port,
				method:"PUT",
				path:"/api/question/" +  questionUid,
				headers: {
					"content-type": "application/json"
				}
			}
			
			var request = http.request(options, function(response){
				var body = "";
				response.on('data', function (chunk) {
					body += chunk;
				}).on('end', function() {
					body = JSON.parse(body);
					test.ok(body.errorcode === 0);
					test.done();
				});
			});
			request.write(JSON.stringify({ questionBody: updatedQuestionBody }));
			request.end();
		}