function(st){
					params.resultStream=st; 
					if(!params.resultStream){
						onError(seg+" returned null stream");
						return;
					}
					next()
			}