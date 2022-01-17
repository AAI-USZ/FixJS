function(elem) {
			if ( elem.nodeName == "#text" )
				return document.createTextNode(elem.nodeValue);
			
			var rval = document.createElement(elem.nodeName);
			
			for (var i = 0; i < elem.attributes.length; ++i) {
				var attr = elem.attributes[i];
				var newAttr = document.createAttribute(attr.name);
				newAttr.value = attr.value;
				rval.setAttribute(newAttr.name, newAttr.value);
			}
			return rval;
		}