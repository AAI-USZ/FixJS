function(aState, bstr, num, b) {
		 	check(aState, bstr, function(x) { return isByteString(x) && x.mutable; },
			      'bytes-set!', 'mutable byte string', 1, arguments);
			check(aState, num, isNatural, 'bytes-set!', 'non-negative exact integer', 2, arguments);
			check(aState, b, isByte, 'bytes-set!', 'byte', 3, arguments);

			var n = jsnums.toFixnum(num);
			if ( n >= bstr.length() ) {
				var msg = ('bytes-set!: index ' + n + ' out of range ' +
					   '[0, ' + (bstr.length-1) + '] for byte-string: ' +
					   types.toWrittenString(bstr));
				raise( types.incompleteExn(types.exnFailContract, msg, []) );
			}
			bstr.set(n, b);
			aState.v =  types.VOID;
		 }