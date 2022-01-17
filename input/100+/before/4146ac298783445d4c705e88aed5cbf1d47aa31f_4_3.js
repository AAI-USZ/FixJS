function unsafeGetOffsetRect(elem, X_else_Y) {
		var box = elem.getBoundingClientRect(),//It might be an error here
			body = document.body,
			docElem = _document_documentElement;
	 
	 	return X_else_Y ?
	 		Math.round(box.left + (window.pageXOffset || docElem.scrollLeft || body.scrollLeft) - (docElem.clientLeft || body.clientLeft || 0)) :
	 		Math.round(box.top + (window.pageYOffset || docElem.scrollTop || body.scrollTop) - (docElem.clientTop || body.clientTop || 0));
	}