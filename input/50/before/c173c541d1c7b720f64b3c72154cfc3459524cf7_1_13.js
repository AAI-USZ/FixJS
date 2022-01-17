function(aState, bstr) {
		 	check(aState, aState, bstr, isByteString, 'bytes-length', 'byte string', 1);
			aState.v =  bstr.length();
		 }