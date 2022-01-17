function(st){
						if(!st){
							onError("Cat returned null stream");
							return;
						}
						params.resultStream = st;
						next();
						}