function(aState, bstr) {
		 	check(aState, aState, bstr, isByteString, 'bytes-copy', 'byte string', 1);
			aState.v =  bstr.copy(true);
		 }