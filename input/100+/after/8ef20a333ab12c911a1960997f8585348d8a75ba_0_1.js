function createElement(element, parentXPath, parentId) {
			if (parentId.lastIndexOf("#", 0) === 0) {
				parentId = parentId.substring(1);
			}

			var isTopLevel = false;
			var container = $("#" + parentId + options.childrenContainerSelector);
			if (container.length == 0) {
				container = $("#" + parentId);
				isTopLevel = true;
			}

			// Get the instance number for the new object
			var instanceNumber;
			if (isTopLevel)
				instanceNumber = countChildren(element, $("." + element.title + "_top")) + 1;
			else instanceNumber = countChildren(element, container) + 1;

			var elementId = options.elementPrefix + nextIndex();

			// Create the element and add it to the container
			var newElement = $('<div/>').attr({
				'id' : elementId,
				'class' : element.title + 'Instance mods_element'
			}).appendTo(container);

			// Create the object in the XML document if it doesn't already exist
			var numElements = xml.evaluate("count(" + parentXPath + '/' + element.elementTitle + ")", xml, nsResolver,
					XPathResult.ANY_TYPE, null).numberValue;
			var existingElement = numElements >= instanceNumber;

			if (!existingElement) {
				var pxpath = xml.evaluate(parentXPath, xml, nsResolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
				var pe = pxpath.singleNodeValue;
				var nonSelectorElementTitle = element.elementTitle;
				var ne = xml.createElementNS(nsResolver(nonSelectorElementTitle.substring(0, nonSelectorElementTitle
						.indexOf(':'))), nonSelectorElementTitle);
				pe.appendChild(ne);
			}
			
			var elementXPath = parentXPath + '/' + element.elementTitle + '[' + instanceNumber + ']';
			
			newElement.data('mods', {
				'element': element,
				'parentXPath': parentXPath,
				'xPath': elementXPath,
				'instanceNumber': instanceNumber,
				'parentId': parentId
			});

			// Begin building contents
			var elementHeader = $("<ul/>").attr({
				'class' : 'element_header'
			}).appendTo(newElement);
			var elementNameContainer = $("<li class='element_name'/>").appendTo(elementHeader);

			// set up element title and entry field if appropriate
			$('<span/>').text(element.title).appendTo(elementNameContainer);

			// Tabs go in next
			addElementTabs(element, elementXPath, elementId, instanceNumber, existingElement, newElement, elementHeader);
			/*
			 * addElementTabs(parentId, newElement, elementHeader, element, xml, elementXPath, instanceNumber,
			 * existingElement);
			 */

			// Action buttons
			addTopActions(element, elementXPath, elementId, parentId, elementHeader, instanceNumber);

			// Activate the tabs
			newElement.tabs();

			return newElement;
		}