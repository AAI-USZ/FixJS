function(err, result){
								//err means the usr settings already exists for this app
								console.log(err);
								request.session.user = user;
								response.send(request.session);

							}