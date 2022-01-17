function(aState, bstr) {
		 	check(aState, bstr, isByteString, 'bytes-copy', 'byte string', 1);
			aState.v =  bstr.copy(true);
		 }