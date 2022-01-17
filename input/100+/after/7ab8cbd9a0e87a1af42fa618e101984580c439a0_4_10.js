function(aState, bstr, theStart) {
		          	check(aState, bstr, isByteString, 'subbytes', 'bytes string', 1, arguments);
			  		check(aState, theStart, isNatural, 'subbytes', 'non-negative exact integer', 2, arguments);
			  
			  var start = jsnums.toFixnum(theStart);
			  if (start > bstr.length()) {
			   	var msg = ('subbytes: starting index ' + start + ' out of range ' +
					   '[0, ' + bstr.length + '] for byte-string: ' +
					   types.toWrittenString(bstr));
				raise( types.incompleteExn(types.exnFailContract, msg, []) );
			  }
			  else {
			  	aState.v =  bstr.subbytes(jsnums.toFixnum(start));
			  }
		      }