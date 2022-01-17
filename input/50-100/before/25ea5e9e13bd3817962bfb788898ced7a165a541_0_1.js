function(){
				var reqId = Math.random();
					m = [];

				var x = 0,
					y = ids.length;

				for(; x < y; x++){
					m[x] = process(ids[x], reqId);
				}

				callback.apply(context, m);
			}