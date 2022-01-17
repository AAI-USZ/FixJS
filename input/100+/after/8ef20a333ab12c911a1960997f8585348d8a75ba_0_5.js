function deleteElementButtonCallback() {
			var elementObject = getParentObject(this, "_del");
			if (elementObject == undefined)
				return;
			
			var removedData = elementObject.data('mods');
			
			// get node from xml document
			var se = xml.evaluate(removedData.xPath, xml, nsResolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
			var pe = se.singleNodeValue.parentNode;

			pe.removeChild(se.singleNodeValue);
			
			elementObject.remove();
			// Cleanup any empty top_level groups left behind.
			var parent = $("#" + removedData.parentId);
			if (parent.hasClass("top_level_element_group") && parent.children('.mods_element').length == 0) {
				parent.remove();
			}
			
			// Shift up the instance numbers of all duplicate tags in the same parent path that were after the removed element.
			$("." + options.modsContent + " ." + removedData.element.title + 'Instance').each(function(){
				var siblingData = $(this).data('mods'); 
				if (siblingData.parentXPath == removedData.parentXPath && siblingData.instanceNumber > removedData.instanceNumber) {
					var shiftUpInstanceNumber = siblingData.instanceNumber - 1;
					siblingData['instanceNumber'] = shiftUpInstanceNumber;
					siblingData['xPath'] = siblingData.parentXPath + "/" + siblingData.element.elementTitle + '[' + shiftUpInstanceNumber + ']';
				}
			});
		}