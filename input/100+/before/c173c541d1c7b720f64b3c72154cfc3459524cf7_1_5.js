function(aState, bstr, num) {
		 	check(aState, aState, bstr, isByteString, 'bytes-ref', 'byte string', 1, arguments);
			check(aState, aState, num, isNatural, 'bytes-ref', 'non-negative exact integer', 2, arguments);

			var n = jsnums.toFixnum(num);
			if ( n >= bstr.length() ) {
				var msg = ('bytes-ref: index ' + n + ' out of range ' +
					   '[0, ' + (bstr.length-1) + '] for byte-string: ' +
					   types.toWrittenString(bstr));
				raise( types.incompleteExn(types.exnFailContract, msg, []) );
			}
			aState.v =  bstr.get(n);
		 }