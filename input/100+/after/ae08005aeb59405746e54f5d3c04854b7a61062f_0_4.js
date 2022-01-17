function deleteElementButtonCallback(parentId, element, parentXPath, instanceNumber) {
			return function() {
				// get node from xml document
				var se = xml.evaluate(parentXPath, xml, nsResolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
				var pe = se.singleNodeValue.parentNode;

				pe.removeChild(se.singleNodeValue);
				var container = $("#" + parentId + options.childrenContainerSelector);
				if (container.length == 0) {
					container = $("#" + parentId);
				}

				// redisplay listing
				var total = container.children("." + element.title + 'Instance').length;
				container.children("." + element.title + 'Instance').remove();

				// if there was more than just the one (now deleted) element present, add them back to the UI
				if (total > 1) {
					for ( var k = 0; k < total - 1; k++) {
						createElement(element, parentXPath, parentId);
					}
				}
			};
		}