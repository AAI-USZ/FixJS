function() {
				var child = xml.evaluate(xpath, xml, nsResolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
				if ($('#' + idValue).val()) {
					if ((child.singleNodeValue.childNodes.length == 1)
							&& (child.singleNodeValue.childNodes[0].nodeType == Node.TEXT_NODE)) {
						child.singleNodeValue.childNodes[0].nodeValue = $('#' + idValue).val();
					} else if (child.singleNodeValue.childNodes.length == 0) {
						child.singleNodeValue.appendChild(xml.createTextNode($('#' + idValue).val()));
					}
				} else {
					// remove empty attribute
					if ((child.singleNodeValue.childNodes.length == 1)
							&& (child.singleNodeValue.childNodes[0].nodeType == Node.TEXT_NODE)) {
						child.singleNodeValue.childNodes[0].nodeValue = '';
					}
				}
			}