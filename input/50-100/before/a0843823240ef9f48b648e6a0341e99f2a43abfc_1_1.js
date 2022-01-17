function(temp){
		Object.keys(validators || {}).forEach(function(k) {
			var v = validators[k];
			if(v.constructor == Validator){
				temp[k] = { parse: v };
			}
			else temp[k] = clone(v);
		});
		return temp;
	})({}