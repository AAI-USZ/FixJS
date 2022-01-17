function() {
		// get node from xml document
        	var se = xml.evaluate(parentPath+'/'+element.elementTitle.replace(/\\/g,"")+'['+count+']', xml, nsResolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null);

		var previousSibling = node_before(se.singleNodeValue);

		if(previousSibling == null) return; // already the first non-WS element

        	var pe = se.singleNodeValue.parentNode;
		
		pe.insertBefore(se.singleNodeValue, previousSibling);

		// redisplay listing
		var total = $(containerId).children("."+element.title+'Instance').length;
		$(containerId).children("."+element.title+'Instance').remove();
	
		// add elements back to the UI
		for(var k = 1; k <= total; k++) {
				createElement(element, xml, parentPath, k, containerId, indent);
		}
	}