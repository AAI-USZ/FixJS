function changeTextCallback() {
			var elementObject = getParentObject(this, "_text");
			if (elementObject === undefined)
				return;
			
			var targetData = elementObject.data('mods');
			
			var child = xml.evaluate(targetData.xPath, xml, nsResolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
			var textValue = $(this).val();
			if (textValue) {
				if ((child.singleNodeValue.childNodes.length == 1)
						&& (child.singleNodeValue.childNodes[0].nodeType == Node.TEXT_NODE)) {
					child.singleNodeValue.childNodes[0].nodeValue = textValue;
				} else if (child.singleNodeValue.childNodes.length == 0) {
					child.singleNodeValue.appendChild(xml.createTextNode(textValue));
				}
			} else {
				// remove empty attribute
				if ((child.singleNodeValue.childNodes.length == 1)
						&& (child.singleNodeValue.childNodes[0].nodeType == Node.TEXT_NODE)) {
					child.singleNodeValue.childNodes[0].nodeValue = '';
				}
			}
		}