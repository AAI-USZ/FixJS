function(chunk){
					if(!headersSent){
						//wait for first write to flush the headers as most exceptions will happen at this point.
						if(context.headers){
							for(var i in context.headers){
								res.setHeader(i, context.headers[i]);
							}
						}
						headersSent = true;
					}
					res.write(chunk);
				}