function(stream){
				if(resultStream){
					console.log("concating "+seg);
					processors.cat.init(function(st){
						if(!st){
							onError("Cat returned unll stream");
							return;
						}	
						next();
						}, context, resultStream, stream);
					
				} else {
					console.log("initial stream: "+seg);
					resultStream = stream;
					if(!resultStream){
						onError(seg+" returned null stream");
						return;
					}
				}
				next()
			}