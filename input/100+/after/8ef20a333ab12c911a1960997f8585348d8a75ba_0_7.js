function moveDownElementButtonCallback() {
			var elementObject = getParentObject(this, "_down");
			if (elementObject == undefined)
				return;
			
			var data = elementObject.data('mods');
			
			// Move the element down in the XML document
			var se = xml.evaluate(data.xPath, xml, nsResolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
			var sibling = node_after(se.singleNodeValue);
			if (sibling == null)
				return;
			
			// Insert before the second sibling, if it exists, otherwise append to parent
			var sibling2 = node_after(sibling); 
			var pe = se.singleNodeValue.parentNode;

			if (sibling2) {
				pe.insertBefore(se.singleNodeValue, sibling2);
			} else {
				pe.appendChild(se.singleNodeValue);
			}
			
			// Move the element down in the UI
			var parent = $("#" + data.parentId);
			var moveObject = elementObject;
			var sibling;
			var siblingData;
			
			if (parent.hasClass("top_level_element_group")) {
				// For a root level element, need to move its parent container
				moveObject = parent;
				sibling = moveObject.next('.top_level_element_group');
				// Get data from the sibling's first mods_element child
				siblingData = sibling.children('.mods_element').data('mods');
			} else {
				// Get the next mods_element object so we don't move a button or something
				sibling = moveObject.next('.mods_element');
				siblingData = sibling.data('mods');
			}
			
			sibling.detach().insertBefore(moveObject);
			
			
			// If the element and its swap were the same type of element then adjust their instance numbers
			if (data.element == siblingData.element) {
				data.instanceNumber = data.instanceNumber + 1;
				data.xPath = data.parentXPath + "/" + data.element.elementTitle + '[' + data.instanceNumber + ']';
				
				siblingData.instanceNumber = siblingData.instanceNumber - 1;
				siblingData.xPath = siblingData.parentXPath + "/" + siblingData.element.elementTitle + '[' + siblingData.instanceNumber + ']';
			}
			reinitializeElement(sibling);
		}