function(elem) {
		for (var i = 0; i < elem.attributes.length; ++i) {
			var attrName = elem.attributes[i].nodeName;
			var attrValue = elem.attributes[i].nodeValue;
			var parser = new $.wiredui.TextElemParser(attrValue);
			
			var token = null;
			while( (token = parser.read()) !== null ) {
				switch(token.type) {
					case 'html':
						
						break;
					case 'output':
					
						break;
					case 'stmt':
					
						break;
				}
			}
		}
	}