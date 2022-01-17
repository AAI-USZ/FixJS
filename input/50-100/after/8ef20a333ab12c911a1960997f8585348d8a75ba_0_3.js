function changeAttributeCallback() {
			var attributeObject = $(this);
			var data = attributeObject.data('mods');
			
			var child = xml.evaluate(data.parentXPath, xml, nsResolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
			if (attributeObject.val()) {
				child.singleNodeValue.setAttribute(data.attribute.title, attributeObject.val());
			} else {
				child.singleNodeValue.removeAttribute(data.attribute.title);
			}
		}