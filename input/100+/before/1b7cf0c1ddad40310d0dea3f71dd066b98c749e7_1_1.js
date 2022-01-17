function createElement(element, xml, parentPath, count, container, indent) {
	var existingElement = false;
	var cleanContainerId = null;
	if (container instanceof jQuery) {
		cleanContainerId = container.attr("id");
	} else {
		cleanContainerId = container.substring(1);
	}
	var elementContainerId = cleanContainerId+'_'+element.title+'Instance'+count; // unique id for element; this may grow too long in deep hierarchies

	// create div to hold new element
	var newElement = $('<div/>').attr({'id' : elementContainerId, 'class' : element.title+'Instance modsElement'}).appendTo(container); 

	// See if element already exists.  If not, create it and add it to xml document
	var nonSelectorElementTitle = element.elementTitle.replace(/\\/g,"");
	var numElements = xml.evaluate("count("+parentPath+'/'+nonSelectorElementTitle+")", xml, nsResolver, XPathResult.NUMBER_TYPE, null);
	
	if( numElements.numberValue >= count ) {
		existingElement = true;
	} else {
		var pxpath = xml.evaluate(parentPath, xml, nsResolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
		var pe = pxpath.singleNodeValue;
		var nonSelectorElementTitle = element.elementTitle.replace(/\\/g,"");
		var ne = xml.createElementNS(nsResolver(nonSelectorElementTitle.substring(0, nonSelectorElementTitle.indexOf(':'))), nonSelectorElementTitle); 
		pe.appendChild(ne);
		
	}

	var elementHeader = $("<ul/>").attr({'class': 'element_header'}).appendTo(newElement);
	var elementNameContainer = $("<li class='element_name'/>").appendTo(elementHeader);
	
	// set up element title and entry field if appropriate
	createElementText(element.title, elementNameContainer);
	
	// Tabs go in next
	addElementTabs(cleanContainerId, newElement, elementHeader, element, xml, parentPath, count, indent, existingElement);
	//var elementTabList = elementHeader;//$("<ul/>").appendTo(elementHeader);//
	
	// Action buttons
	var topActionSpan = $("<li class='top_actions'/>").appendTo(elementHeader);
	
	// create move up button and callback for element
	$('<input>').attr({'type' : 'button', 'value' : '\u2193', 'id' : cleanContainerId+'_'+element.title+'Down'+count}).appendTo(topActionSpan);
									
	$('#'+cleanContainerId+'_'+element.title+'Down'+count).on('click', moveDownElementButtonCallback(container, element, xml, parentPath, count, indent));
	
	// create move up button and callback for element
	$('<input>').attr({'type' : 'button', 'value' : '\u2191', 'id' : cleanContainerId+'_'+element.title+'Up'+count}).appendTo(topActionSpan);
									
	$('#'+cleanContainerId+'_'+element.title+'Up'+count).on('click', moveUpElementButtonCallback(container, element, xml, parentPath, count, indent));

	// create delete button and callback for element
	$('<input>').attr({'type' : 'button', 'value' : 'X', 'id' : cleanContainerId+'_'+element.title+'Del'+count}).appendTo(topActionSpan);
									
	$('#'+cleanContainerId+'_'+element.title+'Del'+count).on('click', deleteElementButtonCallback(container, element, xml, parentPath, count, indent));

	//var elementTabs = $("<div/>").attr({'id' : elementContainerId + 'Tabs', 'class': 'tabsContainer'});
	//elementTabs.appendTo(newElement);
	
	
	
	
	// Activate the tabs
	newElement.tabs();
	
	//$('<br/><br/>').appendTo('#'+elementContainerId);
	
	return newElement;
}