function copyAttributes( element, newElement ) {

	// This is an IE7 workaround. We identified three places that were connected 
	// to the mysterious ie7 crash:
	// 1. Add attribute to dom element (Initialization of jquery-ui sortable)
	// 2. Access the jquery expando attribute. Just reading the name is 
	//    sufficient to make the browser vulnerable for the crash (Press enter)
	// 3. On editable blur the Aloha.editables[0].getContents(); gets invoked.
	//    This invokation somehow crashes the ie7. We assume that the access of 
	//    shared expando attribute updates internal references which are not 
	//    correclty handled during clone(); 
	if ( jQuery.browser.msie && jQuery.browser.version >=7 && typeof element.attributes[jQuery.expando] !== 'undefined' ) {
		jQuery(element).removeAttr(jQuery.expando);
	}

	for ( var i = 0; i < element.attributes.length; i++ ) {
		if ( typeof newElement.setAttributeNS === 'function' ) {
			newElement.setAttributeNS( element.attributes[i].namespaceURI, element.attributes[i].name, element.attributes[i].value );
		} else if ( element.attributes[i].specified ) {
			// fixes https://github.com/alohaeditor/Aloha-Editor/issues/515 
			newElement.setAttribute( element.attributes[i].name, element.attributes[i].value );
		}
	}
}