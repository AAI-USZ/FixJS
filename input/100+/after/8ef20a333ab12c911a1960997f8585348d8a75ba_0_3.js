function addTextTab(element, parentXPath, parentId, instanceNumber, existingElement, contentContainer,
				listContainer) {
			var tabContent = addElementTab(parentId, contentContainer, listContainer, "_tab_text", "Text");

			var textContainsChildren = false;
			
			var valueValue = '';
			if (existingElement) {
				var child = xml.evaluate(parentXPath, xml, nsResolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
				if (child.singleNodeValue.childNodes != null) {
					var children = child.singleNodeValue.childNodes;
					if (children.length == 1) {
						valueValue = children[0].textContent;
					} else if (children.length > 1) {
						valueValue = xml2Str(children[1]);
						textContainsChildren = true;
					}
				}
			}
			var input = createElementInput(element, parentId + '_text', valueValue, tabContent);
			if (textContainsChildren)
				input.attr("disabled", "disabled");
			$('#' + parentId + '_text').change(changeTextCallback);
		}