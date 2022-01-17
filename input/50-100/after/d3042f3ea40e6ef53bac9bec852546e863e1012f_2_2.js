function(){
					if(!headersSent){
						if(context.headers){
							for(var i in context.headers){
								res.setHeader(i, context.headers[i]);
							}
						}
						headersSent = true;
					}
					res.end();
				}