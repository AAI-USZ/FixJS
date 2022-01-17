function(test) {
			var newQuestion = new question(questionUid, userUid, questionTitle, questionBody, 'life', 0);
			
			var options = {
				host:currentHost,
				port:this.port,
				method:"POST",
				path:"/api/user/jrf2/comments",
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
			request.write(JSON.stringify({ comment: newQuestion }));
			request.end();
		}