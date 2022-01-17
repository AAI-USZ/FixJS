function(stream){
				if(params.resultStream){
					processors.cat.init(function(st){
						if(!st){
							onError("Cat returned null stream");
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