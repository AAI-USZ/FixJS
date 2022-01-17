function(aState, bstr) {
		 	check(aState, bstr, isByteString, 'bytes-length', 'byte string', 1);
			aState.v =  bstr.length();
		 }