function(k) {
			  check(aState, aState, k, isNatural, 'make-bytes', 'non-negative exact integer', 1);
			  
			  var ret = [];
			  for (var i = 0; i < jsnums.toFixnum(k); i++) {
			  	ret.push(0);
			  }
			  return types.bytes(ret, true);
		      }