function(st){
						if(!st){
							onError("Cat returned unll stream");
							return;
						}
						params.resultStream = st;
						next();
						}