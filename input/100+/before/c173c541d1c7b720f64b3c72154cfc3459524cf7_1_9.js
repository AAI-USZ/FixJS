function(aState, bstr, b) {
		 	check(aState, aState, bstr, function(x) { return isByteString(x) && x.mutable; },
			      'bytes-fill!', 'mutable byte string', 1, arguments);
			check(aState, aState, b, isByte, 'bytes-fill!', 'byte', 2, arguments);
			
			for (var i = 0; i < bstr.length(); i++) {
				bstr.set(i, b);
			}
			aState.v =  types.VOID;
		 }