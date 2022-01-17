function(stream, err){
				if(err){
					onError(err);
				}
				if(params.resultStream){
					processors.cat.init(function(st, err){
						if(!st){
							onError("Cat returned null stream");
							return;
						}
						if(err){
							onError(err);
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
					next();
				}
				
			}