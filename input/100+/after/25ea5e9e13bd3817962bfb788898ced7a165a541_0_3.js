function(ids, callback, errHandler){
		if(ids instanceof arrType && callback instanceof funcType){
			//execute asynchronously
			setTimeout(function(){
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
			}, 0);
		}else{
			throw 'Invalid require call.';
		}
	}