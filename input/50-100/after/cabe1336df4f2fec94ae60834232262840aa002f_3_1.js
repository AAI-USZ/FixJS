function createEndBreak() {
	// https://github.com/alohaeditor/Aloha-Editor/issues/516
	var endBr = document.createElement("br");
	endBr.setAttribute("class", "aloha-end-br");

	// the code below cannot work, since the endBr is created right above and not inserted into the DOM tree.
//	if ( jQuery.browser.msie && jQuery.browser.version < 8 ) {
//		var endTextNode = document.createTextNode(' ');
//		endBr.insertBefore(endTextNode);
//	}

	return endBr;
}