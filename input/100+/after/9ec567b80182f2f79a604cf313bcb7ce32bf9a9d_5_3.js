function(response){
						var body = "";
						response.on('data', function (chunk) {
							body += chunk;
						}).on('end', function() {
							console.log(body);
							body = JSON.parse(body);
							test.ok(body.errorcode === 0 &&
								body.courses[0].title === "Graphics" && 
								body.courses[0].number === 361);
							test.done();
						});
					}