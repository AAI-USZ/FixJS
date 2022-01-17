function(stream, context){
				
				var headersSent = false;
				
				if(context.cacheable === true){
					
					cache[requested] = {
						val: new Buffer(0)
					};
					
					cache[requested].headers = context.headers;
					
					stream.on('data', function(chunk){
						if(Buffer.isBuffer(chunk)){
							cache[requested].val = Buffer.concat([cache[requested].val, chunk]);
						} else {
							cache[requested].val = Buffer.concat([cache[requested].val, new Buffer(chunk)]);
						}
						
					});
				}
				stream.on('data', function(chunk){
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
				});
				
				stream.on('end', function(){
					if(!headersSent){
						if(context.headers){
							for(var i in context.headers){
								res.setHeader(i, context.headers[i]);
							}
						}
						headersSent = true;
					}
					res.end();
				})
				
				stream.resume();
			//	stream.pipe(res);
			}