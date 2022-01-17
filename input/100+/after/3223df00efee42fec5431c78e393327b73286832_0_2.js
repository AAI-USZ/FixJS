function(name, callback){
		//execute asynchronously
		setTimeout(function(){
			var isArray = name instanceof arrType,
				id = Math.random();
				m = [];

			if(typeof name !== strType && !isArray){
				throw "module name missing or not valid";
			}

			if(isArray){
				var x = 0,
					y = name.length;

				for(; x < y; x++){
					m[x] = process(name[x], id);
				}
			}else{
				m[0] = process(name, id);
			}

			if(callback instanceof funcType){
				callback.apply(context, m);
			}
		}, 0);
	}