function $_prototype_appendAll (arrayToAdd) {
		var $fragment = $.single(document.createDocumentFragment())
		  , i = 0
		  , len = arrayToAdd.length
		  , $fragAppend = $fragment.append
		  ;

		do {
		  $fragAppend.apply(this, arrayToAdd[i] );
		} while (i++ < len);
		return this.append($fragment);
	}