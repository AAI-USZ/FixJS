function(aState, bstr) {
		 	check(aState, aState, bstr, isByteString, 'bytes->immutable-bytes', 'byte string', 1);
			if ( bstr.mutable ) {
				aState.v =  bstr.copy(false);
				return;
			}
			else {
				aState.v =  bstr;
			}
		 }