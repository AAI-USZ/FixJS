function changeAttribute(attribute, parentXPath, attributeId) {
			var child = xml.evaluate(parentXPath, xml, nsResolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
			if ($('#' + attributeId).val()) {
				child.singleNodeValue.setAttribute(attribute.title, $('#' + attributeId).val());
			} else {
				child.singleNodeValue.removeAttribute(attribute.title);
			}
		}