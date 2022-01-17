function(ids, callback){
		var ret;

		if(!callback && typeof ids === strType){
			//execute synchronously as per CommonJS spec
			ret = process(ids, Math.random());
		}else if(callback instanceof Function && ids instanceof Array){
			//execute asynchronously
			setTimeout(function(){
				var reqId = Math.random();
					m = [];

				var x = 0,
					y = ids.length;

				for(; x < y; x++){
					m[x] = process(ids[x], reqId);
				}

				callback.apply(context, m);
			}, 0);
		}else{
			throw "Invalid require invokation";
		}

		return ret;
	}