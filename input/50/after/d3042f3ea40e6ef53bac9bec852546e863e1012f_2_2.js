function(st, err){
					if(err){
						onError(err);
						return;
					}
					params.resultStream=st; 
					if(!params.resultStream){
						onError(seg+" returned null stream");
						return;
					}
					next()
			}