function(aState, str1, str2, strs) {
		 	strs.unshift(str2);
			strs.unshift(str1);

			for(var i = 0; i < strs.length; i++) {
				check(aState, strs[i], isString, 'string-ci=?', 'string', i+1, strs);
				strs[i] = strs[i].toString().toLowerCase();
			}

			aState.v =  compare(strs, function(strA, strB) {return strA === strB;});
		 }