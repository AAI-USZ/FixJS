function(){
	return function(req, res, next){
		//Get the requested URL, less the starting '/'
		var requested = url.parse(req.url).pathname.substring(1);
		if(requested.length == 0){
			if(next){next()};
			return;
		}
		
		if(cache[requested]){
			var entry = cache[requested];
			if(entry.headers){
				for(var i in entry.headers){
					res.setHeader(i, entry.headers[i]);
				}
			}
			res.end(entry.val);
			return;
		}
		
		var segments = resolve(requested.split('.'));
		var stream = processSegments(segments,
			//onSuccess
			function(stream, context){
				
				if(context.headers){
					for(var i in context.headers){
						res.setHeader(i, context.headers[i]);
					}
				}
				
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
					res.write(chunk);
				});
				
				stream.on('end', function(){
					res.end();
				})
				
				stream.resume();
			//	stream.pipe(res);
			},
			//onError
			function(error){
				next(error);
			},
			function onNotFound(){
				if(next){next()};
				return;
			}
		);
	};
}