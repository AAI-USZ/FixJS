function(temp){
		Object.keys(config || {}).forEach(function(k) {
			var v = config[k];
			if(v.constructor == Validator){
				temp[k] = { parse: v };
			}
			else temp[k] = clone(v);
		});
		return temp;
	})({}