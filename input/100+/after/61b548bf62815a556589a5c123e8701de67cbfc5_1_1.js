function(test) {
			var newQuestion = {
				title: questionTitle,
				body: questionBody,
				category: 'life',
				sectionUuid: section
			}
			
			this.requestOptions.method = "POST";
			this.requestOptions.path   = "/api/question";

			var request = http.request(this.requestOptions, function(response){
				var body = "";
				response.on('data', function (chunk) {
					body += chunk;
				}).on('end', function() {
					console.log(body);
					body = JSON.parse(body);
					test.ok(body.errorcode === 0);
					test.done();
				});
			});
			request.write(JSON.stringify({ question: newQuestion }));
			request.end();
		}