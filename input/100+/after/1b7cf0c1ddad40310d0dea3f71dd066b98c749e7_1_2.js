function addElementTabs(cleanContainerId, tabContainer, tabList, elementInfo, xml, parentPath, count, indent, existingElement) {
	// generate element tabs
	var attributesArray = elementInfo.attributes;
	var hasAttributes = (attributesArray.length > 0 ? true : false);
	var elementsArray = elementInfo.elements;
	var hasElements = (elementsArray.length > 0 ? true : false);
	var hasText = elementInfo.type != 'none';
	
	if (hasText) {
		var tabContent = addElementTab(cleanContainerId, tabContainer, tabList, "_text", "Text");
		
		var valueValue = '';
		if(existingElement) {
			var nonSelectorElementTitle = elementInfo.elementTitle;
			// alert("Getting data from "+nonSelectorElementTitle+' '+count);
                	var child = xml.evaluate(parentPath+'/'+nonSelectorElementTitle+'['+count+']', xml, nsResolver, XPathResult.ANY_TYPE, null);
                	switch (child.resultType) {
                  	case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:
                    		var c = child.iterateNext();
                    		if (c) valueValue = c.textContent;
                    	break;
                  	case XPathResult.STRING_TYPE:
                    		valueValue = child.stringValue;
			}
		}
		createElementInput(elementInfo, cleanContainerId+'_'+elementInfo.title+count, valueValue, tabContent);
		//createElementLabelAndInput(elementInfo, cleanContainerId+'_'+elementInfo.title, valueValue, tabContent, count, xml, parentPath+'/'+nonSelectorElementTitle+'['+count+']');
	}
	
	if(hasElements) {
		// Generate the tab
		var tabContent = addElementTab(cleanContainerId, tabContainer, tabList, "_elements", "Subelements");
		
		// Generate the buttons for new subelements
		var addElementsContainer = $('<div/>').attr({'id' : cleanContainerId+'_elementsDiv', 'class' : 'add_components'}).appendTo(tabContent);
		$('<span/>').html("Add:").appendTo(addElementsContainer);

		for (var i = 0; i < elementsArray.length; i++) {
			/*if (i > 0)
				addElementsContainer.append(", ");*/
			addElementButton(elementInfo, cleanContainerId, addElementsContainer, tabContent, xml, parentPath, elementsArray[i], count, indent);
		}
		
		// Add in existing children
		// order child nodes as they are in XML
		var se = xml.evaluate(parentPath+'/'+elementInfo.elementTitle+'['+count+']', xml, nsResolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null);

		var elementHash = {};

		for ( var i = 0; i < elementsArray.length; i++) {
			elementHash[elementsArray[i].elementTitle] = 0;
		}

		for (var j = 0; j < se.singleNodeValue.childNodes.length; j++) {
			var nodeName = se.singleNodeValue.childNodes[j].nodeName;
			for (var i = 0; i < elementsArray.length; i++) {
				if(elementsArray[i].elementTitle == nodeName) {
					elementHash[elementsArray[i].elementTitle] = elementHash[elementsArray[i].elementTitle] + 1;
					createElement(elementsArray[i], xml, parentPath+'/'+elementInfo.elementTitle+'['+count+']', elementHash[elementsArray[i].elementTitle], tabContent, 4);
				}
			}
		}
	}

	// attribute div	
	if(hasAttributes) {
		// Generate the tab
		var tabContent = addElementTab(cleanContainerId, tabContainer, tabList, "_attr", "Attributes");
		
		var attrsDiv = $('<div/>').attr({'id' : cleanContainerId+'_attrsDiv'}).appendTo(tabContent);
		
		var attrPath = parentPath+'/'+elementInfo.elementTitle;

		if(count > 1) {
			attrPath = attrPath + '['+count+']';
		} 

		// populate attribute div with attribute entry fields
		for (var i = 0; i < attributesArray.length; i++) {				
			createAttribute(cleanContainerId+"_"+attributesArray[i].title, attributesArray[i], xml, attrPath, attrsDiv, 2);
			$('<br/>').appendTo(attrsDiv);
		}
	}
}