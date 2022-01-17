function(offset, line, column, first, tail) {
        	var ret = [first];
        	tail.forEach(function(i) {
        		ret.push(i[1]);
        	});
        	return ret;
        }