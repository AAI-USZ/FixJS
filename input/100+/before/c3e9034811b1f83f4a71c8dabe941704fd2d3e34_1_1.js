function copyAttributes( element,  newElement ) {
	for ( var i = 0; i < element.attributes.length; i++ ) {
		if ( typeof newElement.setAttributeNS === 'function' ) {
			newElement.setAttributeNS( element.attributes[i].namespaceURI, element.attributes[i].name, element.attributes[i].value );
		} else if ( element.attributes[i].specified ) {
			// fixes https://github.com/alohaeditor/Aloha-Editor/issues/515 
			newElement.setAttribute( element.attributes[i].name, element.attributes[i].value );
		}
	}
}