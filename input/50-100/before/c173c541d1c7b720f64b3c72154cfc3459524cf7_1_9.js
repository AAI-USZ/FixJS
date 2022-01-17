function(k, b) {
			  check(aState, aState, k, isNatural, 'make-bytes', 'non-negative exact integer', 1, arguments);
			  check(aState, aState, b, isByte, 'make-bytes', 'byte', 2, arguments);

			  var ret = [];
			  for (var i = 0; i < jsnums.toFixnum(k); i++) {
			  	ret.push(b);
			  }
			  return types.bytes(ret, true);
		      }