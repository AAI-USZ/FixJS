function(err, template_output){
							if(err){
								return callback({"ignore": false, "message": err}, null);	
							}

							// TODO: refactor and test
							return compiler.compile(template_output, function(err, output){
								if(err){
									return callback({"ignore": false, "message": err}, null);	
								}

								return callback(null, {"body": output, "modified": true});
							});	
						}