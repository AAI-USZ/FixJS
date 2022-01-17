function(){
				var reqId = Math.random();
					m = [];

				var x = 0,
					y = ids.length;

				try{
					for(; x < y; x++){
						m[x] = process(ids[x], reqId);
					}
				}catch(err){
					if(errHandler instanceof funcType){
						errHandler.call(context, err);
					}else{
						throw err;
					}
				}

				callback.apply(context, m);
			}