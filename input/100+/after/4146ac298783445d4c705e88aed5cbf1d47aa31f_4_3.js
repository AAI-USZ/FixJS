function unsafeGetOffsetRect(elem, X_else_Y) {
		var box = elem.getBoundingClientRect(),//It might be an error here
			body = document.body;
	 
		if(!_document_documentElement.contains(elem))
			return X_else_Y ? box.left : box.top;

	 	return X_else_Y ?
	 		box.left + _getScrollX() - (_document_documentElement.clientLeft || body.clientLeft || 0) :
	 		box.top + _getScrollY() - (_document_documentElement.clientTop || body.clientTop || 0);
	}