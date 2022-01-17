function(aState, bstr, theStart, theEnd) {
		          check(aState, bstr, isByteString, 'subbytes', 'byte string', 1, arguments);
			  check(aState, theStart, isNatural, 'subbytes', 'non-negative exact integer', 2, arguments);
			  check(aState, theEnd, isNatural, 'subbytes', 'non-negative exact integer', 3, arguments);

			  var start = jsnums.toFixnum(theStart);
			  var end = jsnums.toFixnum(theEnd);
			  if (start > bstr.length()) {
			   	var msg = ('subbytes: starting index ' + start + ' out of range ' +
					   '[0, ' + bstr.length() + '] for byte-string: ' +
					   types.toWrittenString(bstr));
				raise( types.incompleteExn(types.exnFailContract, msg, []) );
			  }
			  if (end < start || end > bstr.length()) {
			   	var msg = ('subbytes: ending index ' + end + ' out of range ' + '[' + start +
					   ', ' + bstr.length() + '] for byte-string: ' +
					   types.toWrittenString(bstr));
				raise( types.incompleteExn(types.exnFailContract, msg, []) );
			  }
			   else {
			  	aState.v =  bstr.subbytes(start, end);
			   }
		      }