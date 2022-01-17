function(st, err){
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
						}