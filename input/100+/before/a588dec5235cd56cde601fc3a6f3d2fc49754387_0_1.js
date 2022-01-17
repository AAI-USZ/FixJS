function(){
		var next;
		if(nextIndex>nexts.length-1){
			next = function(){ 
						onSuccess(params.resultStream, context);
					};
		} else {
			next = nexts[nextIndex];
		}

		if(streams[seg]){
			streams[seg].init( function(stream){
				if(params.resultStream){
					processors.cat.init(function(st){
						if(!st){
							onError("Cat returned unll stream");
							return;
						}
						params.resultStream = st;
						next();
						}, context, params.resultStream, stream);
					
				} else {
					params.resultStream = stream;
					if(!params.resultStream){
						onError(seg+" returned null stream");
						return;
					}
				}
				next()
			}, context);	
		} else if(processors[seg]){
			var proc = processors[seg];
			proc.init(function(st){
					params.resultStream=st; 
					if(!params.resultStream){
						onError(seg+" returned null stream");
						return;
					}
					next()
			}, context, params.resultStream);
		} else {
			onNotFound();
			return;
		}
	}